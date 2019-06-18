import { Forwarder, TestExecutionContext, Project, TestContextEntity } from '@sakuli/core'
import gearman from 'gearman'
import { submitJob } from './gearman/submit-job.function';
import { encrypt } from './crypto/aes-crypto.function';
import { TemplateEnvironment } from '@sakuli/forwarder-commons';
import { GearmanForwarderProperties } from './gearman-forwarder-properties.class';
import { testEntityToTemplateModel } from './output/test-entity-to-template-model.function';
import { createParentMap, ParentMap } from './output/create-parent-map.function';


export class GearmanForwarder implements Forwarder {

    constructor(
        readonly templateEnvironment = new TemplateEnvironment()
    ) { }

    async forward(ctx: TestExecutionContext, project: Project): Promise<any> {
        const props = project.objectFactory(GearmanForwarderProperties)
        let client = gearman(
            props.serverHost,
            props.serverPort,
            { timeout: 15000 }
        );

        const template = this.templateEnvironment.getTemplate('main.twig');
        const testEntities: TestContextEntity[] = [
            ...ctx.testSuites,
            ...ctx.testCases,
            ...ctx.testSteps,
        ]
        const parentMap = ctx.testSuites
            .map(createParentMap)
            .reduce((agg, map) => new Map([...agg, ...map]),new Map as ParentMap);

        for (let testContextEntity of testEntities) {
            const testDataEntity = testEntityToTemplateModel(testContextEntity, parentMap);
            const renderedTemplate = template.render({
                gearman: props,
                testDataEntity
            })

            const payload = props.encryption
                ? await encrypt(renderedTemplate, props.secretKey)
                : renderedTemplate;
            await submitJob(client, payload);
        }
    }

}
