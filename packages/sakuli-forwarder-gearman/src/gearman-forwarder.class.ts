import {
    FinishedMeasurable,
    Forwarder,
    Project,
    TestActionContext,
    TestCaseContext,
    TestExecutionContext,
    TestStepContext,
    TestSuiteContext
} from '@sakuli/core'
import gearman from 'gearman'
import {GearmanData, submitJob} from './gearman/submit-job.function';
import {encrypt} from './crypto/aes-crypto.function';
import {GearmanForwarderProperties} from './gearman-forwarder-properties.class';
import {createPropertyObjectFactory, ifPresent, Maybe, SimpleLogger} from "@sakuli/commons";
import {OmdTestResultOutputBuilder} from "@sakuli/result-builder-omd";
import {validateProps} from "@sakuli/result-builder-commons";


export class GearmanForwarder implements Forwarder {

    private gearmanProps: Maybe<GearmanForwarderProperties> = null;
    private logger: Maybe<SimpleLogger> = null;

    constructor(
        private outputBuilder = new OmdTestResultOutputBuilder()
    ) {
    }

    logDebug(message: string, ...data: any[]) {
        ifPresent(this.logger, log => log.debug(message, ...data));
    }
    logInfo(message: string, ...data: any[]) {
        ifPresent(this.logger, log => log.info(message, ...data));
    }
    logWarn(message: string, ...data: any[]) {
        ifPresent(this.logger, log => log.warn(message, ...data));
    }
    logError(message: string, ...data: any[]) {
        ifPresent(this.logger, log => log.error(message, ...data));
    }

    /**
     * Is called after all project loader has run and before TestExecution has started
     * @param project
     * @param logger
     */
    async setup(project: Project, logger: SimpleLogger): Promise<void> {
        this.gearmanProps = createPropertyObjectFactory(project)(GearmanForwarderProperties);
        await validateProps(this.gearmanProps);
        this.logger = logger;
    }

    /**
     * Is called once a TestSuite has finished. Also Contains information about TestCases and TestSteps of the TestSuite
     * @param entity: The current TestSuiteContext to forward
     * @param ctx: The current TestExecutionContext to forward
     */
    async forwardSuiteResult(entity: TestSuiteContext & FinishedMeasurable, ctx: TestExecutionContext): Promise<void> {
        await ifPresent(this.gearmanProps, async (props) => {
            await validateProps(props);
            if (props.enabled) {
                const renderedTemplate = this.outputBuilder.render(entity, {
                    currentSuite: entity,
                    props
                });
                this.logDebug(`Forwarding suite result.`);
                await this.doForward(renderedTemplate);
            } else {
                this.logDebug(`Gearman forwarding disabled via properties.`);
            }
        }, () => {
            this.logWarn(`Missing Gearman configuration, aborting forwarding`);
            return Promise.resolve();
        });
        return Promise.resolve();
    }

    /**
     * Is called once a TestCase has finished. Also Contains information about TestSteps of the TestCase
     * @param entity: The current TestCaseContext to forward
     * @param ctx: The current TestExecutionContext to forward
     */
    async forwardCaseResult(entity: TestCaseContext & FinishedMeasurable, ctx: TestExecutionContext): Promise<void> {
        await ifPresent(this.gearmanProps, async (props) => {
            const properties = props as GearmanForwarderProperties;
            if (properties.enabled) {
                const parentSuite = ctx.testSuites.find(ts => ts.getChildren().includes(entity));
                ifPresent(parentSuite, async (suite) => {
                    const renderedTemplate = this.outputBuilder.render(entity, {
                        currentSuite: suite,
                        currentCase: entity,
                        props
                    });
                    this.logDebug(`Forwarding case result.`);
                    await this.doForward(renderedTemplate);
                });
            } else {
                this.logDebug(`Gearman forwarding disabled via properties.`);
            }
        }, () => {
            this.logWarn(`Missing Gearman configuration, aborting forwarding`);
            return Promise.resolve();
        });
        return Promise.resolve();
    }

    /**
     * Is called once a TestStep has finished
     * @param entity: The current TestStepContext to forward
     * @param ctx: The current TestExecutionContext to forward
     */
    async forwardStepResult(entity: TestStepContext & FinishedMeasurable, ctx: TestExecutionContext): Promise<void> {
        await ifPresent(this.gearmanProps, async (props) => {
            const properties = props as GearmanForwarderProperties;
            if (properties.enabled) {
                const parentCase: Maybe<TestCaseContext> = ctx.testCases.find(tc => tc.getChildren().includes(entity));
                const parentSuite: Maybe<TestSuiteContext> = ifPresent(parentCase, (testCase) => {
                    return ctx.testSuites.find(ts => ts.getChildren().includes(testCase));
                }, () => undefined);
                ifPresent(parentSuite, async (suite) => {
                    const renderedTemplate = this.outputBuilder.render(entity, {
                        currentSuite: suite,
                        currentCase: parentCase,
                        props
                    });
                    this.logDebug(`Forwarding step result.`);
                    await this.doForward(renderedTemplate);
                    return Promise.resolve();
                });
            } else {
                this.logDebug(`Gearman forwarding disabled via properties.`);
            }
        }, () => {
            this.logWarn(`Missing Gearman configuration, aborting forwarding`);
            return Promise.resolve();
        });
    }

    /**
     *
     * @param entity
     * @param ctx
     */
    forwardActionResult(entity: TestActionContext & FinishedMeasurable, ctx: TestExecutionContext): Promise<void> {
        return Promise.resolve();
    }

    /**
     * Is called after the test execution has finished
     * @param ctx
     */
    async forward(ctx: TestExecutionContext): Promise<any> {
        await ifPresent(this.gearmanProps, async (props) => {
            const properties = props as GearmanForwarderProperties;
            if (properties.enabled) {
                for (const testContextEntity of ctx.testSuites) {
                    const renderedTemplate = this.outputBuilder.render(testContextEntity, {
                        currentSuite: testContextEntity,
                        props
                    });
                    this.logDebug(`Forwarding final result.`);
                    await this.doForward(renderedTemplate);
                }
            } else {
                this.logDebug(`Gearman forwarding disabled via properties.`);
            }
        }, () => {
            this.logWarn(`Missing Gearman configuration, aborting forwarding`);
            return Promise.resolve();
        });
        return Promise.resolve();
    }

    private async doForward(rawPayload: string): Promise<any> {
        await ifPresent(this.gearmanProps, async (props) => {
            const properties = props as GearmanForwarderProperties;
            try {
                let client = gearman(
                    properties.serverHost,
                    properties.serverPort,
                    {timeout: 15000}
                );

                this.logDebug(`Forwarding to queue '${properties.serverQueue}' on Gearman host '${properties.serverHost}:${properties.serverPort}'.`);

                const payload = properties.encryption
                    ? await encrypt(rawPayload, properties.secretKey)
                    : rawPayload;
                await submitJob({
                        connection: client,
                        checkQueue: properties.serverQueue,
                        payload
                    } as GearmanData,
                    this.logger);
            } catch (err) {
                this.logError(`Failed to forward, error occured.`, err);
            }
        }, () => {
            this.logWarn(`Missing Gearman configuration, aborting forwarding`);
            return Promise.resolve();
        });
    }

    /**
     * Is called right after the promise returned from forward method is resolved
     */
    tearDown(): Promise<void> {
        return Promise.resolve();
    }
}
