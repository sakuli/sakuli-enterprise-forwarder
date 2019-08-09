import {Forwarder, Project, TestExecutionContext} from "@sakuli/core";
import {createPropertyObjectFactory, ifPresent, Maybe, SimpleLogger} from "@sakuli/commons";
import {CheckMkForwarderProperties} from "./checkmk-forwarder-properties.class";
import {promises as fs} from 'fs';
import {dirExists} from "./dir-exists.fucntion";
import {join, resolve} from "path";
import {CheckMkTestResultOutputBuilder} from "@sakuli/result-builder-checkmk";
import {createSpoolFileName} from "./create-spool-file.function";

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

    async setup(project: Project, logger: SimpleLogger): Promise<any> {
        this.properties = createPropertyObjectFactory(project)(CheckMkForwarderProperties);
        this.logger = logger;
    }

    async forward(ctx: TestExecutionContext): Promise<any> {
        return ifPresent(this.properties, async props => {
                const properties = props as CheckMkForwarderProperties;
                if ((properties.enabled as any) === 'true') {
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
                                this.logDebug(`Failed to write to '${spoolFile}'. Reason:`, e);
                            }
                        } else {
                            this.logDebug(`spool directory '${path}' does not exists, skipping checkmk forwarding.`);
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
