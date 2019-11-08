import {Forwarder, Project, TestExecutionContext} from "@sakuli/core";
import {createPropertyObjectFactory, ifPresent, Maybe, SimpleLogger} from "@sakuli/commons";
import {CheckMkForwarderProperties} from "./checkmk-forwarder-properties.class";
import {promises as fs} from 'fs';
import {dirExists} from "./dir-exists.function";
import {join, resolve} from "path";
import {CheckMkTestResultOutputBuilder} from "@sakuli/result-builder-checkmk";
import {createSpoolFileName} from "./create-spool-file.function";
import {validateProps} from "@sakuli/result-builder-commons";

export class CheckMkForwarder implements Forwarder {

    private properties: Maybe<CheckMkForwarderProperties>;
    private logger: Maybe<SimpleLogger>;

    constructor(
        private outputBuilder = new CheckMkTestResultOutputBuilder()
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

    async setup(project: Project, logger: SimpleLogger): Promise<void> {
        this.properties = createPropertyObjectFactory(project)(CheckMkForwarderProperties);
        await validateProps(this.properties);
        this.logger = logger;
    }

    async forward(ctx: TestExecutionContext): Promise<any> {
        return ifPresent(this.properties, async props => {
                if (props.enabled) {
                    for (const testContextEntity of ctx.testSuites) {
                        const renderedTemplate = this.outputBuilder.render(testContextEntity, {
                            currentSuite: testContextEntity,
                            props
                        });
                        const fileName = createSpoolFileName(testContextEntity, props);
                        const path = props.spoolDir;
                        this.logDebug(`Forwarding final result to checkmk via spool file '${fileName}' in '${path}'.`);
                        const spoolFile = resolve(join(path, fileName));
                        if (await dirExists(path)) {
                            try {
                                await fs.writeFile(
                                    spoolFile,
                                    renderedTemplate,
                                    {flag: 'w'}
                                );
                            } catch (e) {
                                this.logError(`Failed to write to '${spoolFile}'. Reason:`, e);
                            }
                        } else {
                            this.logWarn(`spool directory '${path}' does not exists, skipping checkmk forwarding.`);
                        }
                    }
                } else {
                    this.logDebug(`CheckMK forwarding disabled via properties.`);
                }
            },
            () => Promise.reject(Error('Could not create CheckMK Properties from Project'))
        )
    }
}
