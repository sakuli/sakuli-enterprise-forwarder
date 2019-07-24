import { Forwarder, TestExecutionContext, Project } from "@sakuli/core";
import { SimpleLogger, Maybe, ifPresent, createPropertyObjectFactory } from "@sakuli/commons";
import { renderShortSummary, renderDetailedSummary, renderPerformanceData } from '@sakuli/nagios-result-builder';
import { CheckMkForwarderProperties } from "./checkmk-forwarder-properties.class";
import { stripIndents } from "common-tags";
import { promises as fs } from 'fs';
import { dirExists } from "./dir-exists.fucntion";
import { resolve, join } from "path";

export class CheckMkForwarder implements Forwarder {

    private properties: Maybe<CheckMkForwarderProperties>

    async setup(project: Project, logger: SimpleLogger): Promise<any> {
        this.properties = createPropertyObjectFactory(project)(CheckMkForwarderProperties);
    }

    async forward(ctx: TestExecutionContext): Promise<any> {
        return ifPresent(this.properties, async properties => {
            if (properties.enabled) {

                const [suite] = ctx.testSuites;
                const data = `${ctx.resultState} ${renderPerformanceData(suite)} ${renderShortSummary(suite)} ${renderDetailedSummary(suite)}`;
                const entry = stripIndents`<<<local>>>
                ${data}

                `
                const fileName = `${properties.freshness}_${properties.spoolfilePrefix}${suite.id}`;
                const path = properties.spoolDir;
                if( await dirExists(path)) {

                    await fs.writeFile(
                        resolve(join(path, fileName)),
                        entry,
                        {flag: 'a'}
                    );
                }
            }
        }, () => Promise.reject(Error('Could not create CheckMK Properties from Project')))
    }



}
