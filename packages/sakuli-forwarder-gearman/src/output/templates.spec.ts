import { TemplateEnvironment } from "@sakuli/forwarder-commons";
import { promises as fs, readdirSync, readFileSync } from 'fs';
import { join } from "path";
import { TestExecutionContext, TestContextEntity, TestCaseContext, TestContextEntityKind } from "@sakuli/core/dist";
import { SimpleLogger } from "@sakuli/commons/dist";
import { GearmanForwarderProperties } from "../gearman-forwarder-properties.class";
import { inspect } from "util";
import { createEntity } from "./__mocks__/create-entity.function";
import { createParentMap } from "./create-parent-map.function";
import { testEntityToTemplateModel } from "./test-entity-to-template-model.function";
import { Entities} from './__mocks__';

describe('templates', () => {
    const templateDir = join(__dirname, '..', '..', 'templates');
    let templateEnvironment: TemplateEnvironment;
    let ctx: TestExecutionContext;


    const ParentSuite = createEntity('suite', {id: 'example_xfce'});

    beforeEach(() => {
        templateEnvironment = new TemplateEnvironment(templateDir);
        ctx = new TestExecutionContext(new SimpleLogger);

    });

    describe.each(Object.entries(Entities))('%s for main.twig', (key: string, testContextEntity: TestContextEntity) => {

        let properties: Partial<GearmanForwarderProperties>;
        let tpl: any;
        let expected: string;
        beforeEach(() => {
            properties = {
                nagiosHost: 'my.nagios.host',
                serviceType: 'passive'
            }
            tpl = templateEnvironment.getTemplate('main.twig');
            expected = readFileSync(join(__dirname, '__snapshots__', key + '.txt')).toString();
        })

        it('should match static file', () => {
            const parentMap = createParentMap(testContextEntity);
            parentMap.set(testContextEntity, ParentSuite);
            const testDataEntity = testEntityToTemplateModel(testContextEntity, parentMap);
            const rendered = tpl.render({
                gearman: properties,
                testDataEntity
            });
            console.log(rendered);
            expect(rendered).toEqual(expected)
        })

    })

})
