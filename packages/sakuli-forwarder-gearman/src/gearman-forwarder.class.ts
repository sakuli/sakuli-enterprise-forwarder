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
import {NagiosTestResultOutputBuilder} from "@sakuli/nagios-result-builder";


export class GearmanForwarder implements Forwarder {

    private gearmanProps: Maybe<GearmanForwarderProperties> = null;
    private logger: Maybe<SimpleLogger> = null;

    constructor(
        private jobQueue = [],
        private outputBuilder = new NagiosTestResultOutputBuilder()
    ) {
    }

    logDebug(message: string, ...data: any[]) {
        ifPresent(this.logger, log => log.debug(message, ...data));
    }

    /**
     * Is called after all project loader has run and before TestExecution has started
     * @param project
     * @param logger
     */
    setup(project: Project, logger: SimpleLogger): Promise<void> {
        this.gearmanProps = createPropertyObjectFactory(project)(GearmanForwarderProperties);
        this.logger = logger;
        return Promise.resolve();
    }

    /**
     * Is called once a TestSuite has finished. Also Contains information about TestCases and TestSteps of the TestSuite
     * @param entity: The current TestSuiteContext to forward
     * @param ctx: The current TestExecutionContext to forward
     */
    async forwardSuiteResult(entity: TestSuiteContext & FinishedMeasurable, ctx: TestExecutionContext): Promise<void> {
        await ifPresent(this.gearmanProps, async (props) => {
            const renderedTemplate = this.outputBuilder.render(entity, {
                currentSuite: entity,
                props
            });
            this.logDebug(`Forwarding suite result.`);
            await this.doForward(renderedTemplate);
        }, () => {
            ctx.logger.debug(`Missing Gearman configuration, aborting forwarding`);
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
        const parentSuite = ctx.testSuites.find(ts => ts.getChildren().includes(entity));
        await ifPresent(this.gearmanProps, async (props) => {
            ifPresent(parentSuite, async (suite) => {
                const renderedTemplate = this.outputBuilder.render(entity, {
                    currentSuite: suite,
                    currentCase: entity,
                    props
                });
                this.logDebug(`Forwarding case result.`);
                await this.doForward(renderedTemplate);
            });
        }, () => {
            ctx.logger.debug(`Missing Gearman configuration, aborting forwarding`);
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
        const parentCase: Maybe<TestCaseContext> = ctx.testCases.find(tc => tc.getChildren().includes(entity));
        const parentSuite: Maybe<TestSuiteContext> = ifPresent(parentCase, (testCase) => {
            return ctx.testSuites.find(ts => ts.getChildren().includes(testCase));
        }, () => undefined);
        await ifPresent(this.gearmanProps, async (props) => {
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
        }, () => {
            ctx.logger.debug(`Missing Gearman configuration, aborting forwarding`);
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
     * @param project
     */
    async forward(ctx: TestExecutionContext): Promise<any> {
        for (const testContextEntity of ctx.testSuites) {
            await ifPresent(this.gearmanProps, async (props) => {
                const renderedTemplate = this.outputBuilder.render(testContextEntity, {
                    currentSuite: testContextEntity,
                    props
                });
                this.logDebug(`Forwarding final result.`);
                await this.doForward(renderedTemplate);
            }, () => {
                ctx.logger.debug(`Missing Gearman configuration, aborting forwarding`);
                return Promise.resolve();
            });
        }
        return Promise.resolve();
    }

    private async doForward(rawPayload: string): Promise<any> {
        ifPresent(this.gearmanProps, async (props) => {
            if (props.enabled) {
                try {
                    let client = gearman(
                        props.serverHost,
                        props.serverPort,
                        {timeout: 15000}
                    );

                    this.logDebug(`Forwarding to queue '${props.serverQueue}' on Gearman host '${props.serverHost}:${props.serverPort}'.`);

                    const payload = props.encryption
                        ? await encrypt(rawPayload, props.secretKey)
                        : rawPayload;
                    await submitJob({
                            connection: client,
                            checkQueue: props.serverQueue,
                            payload
                        } as GearmanData,
                        this.logger);
                } catch (err) {
                    this.logDebug(`Failed to forward, error occured.`, err);
                }
            } else {
                this.logDebug(`Gearman forwarding enabled: ${props.enabled}`)
            }
        });
    }

    /**
     * Is called right after the promise returned from forward method is resolved
     */
    tearDown(): Promise<void> {
        return Promise.resolve();
    }
}
