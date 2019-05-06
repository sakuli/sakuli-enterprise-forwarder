import { TemplateEnvironment } from "@sakuli/forwarder-commons";
import { promises as fs, readdirSync, readFileSync } from 'fs';
import { join } from "path";
import { TestExecutionContext, TestContextEntity, TestCaseContext, TestContextEntityKind } from "@sakuli/core/dist";
import { SimpleLogger } from "@sakuli/commons/dist";
import { GearmanForwarderProperties } from "../gearman-forwarder-properties.class";
import { create } from "domain";


describe('templates', () => {
    const templateDir = join(__dirname, '..', '..', 'templates');
    let templateEnvironment: TemplateEnvironment;
    let ctx: TestExecutionContext;

    const createEntity = (kind: TestContextEntityKind, data: Partial<TestContextEntity>, children: TestContextEntity[] = []): TestContextEntity => {
        return Object.assign(data, new (class extends TestContextEntity {
            kind = kind
            getChildren() {
                return children;
            }
        }));
    }

    const entities = {
        TestCase_OK: createEntity('case', {
            warningTime: 20,
            criticalTime: 30,
            startDate: new Date(1970, 1, 1, 10, 30, 0),
            endDate: new Date(1970, 1, 1, 10, 30, 14, 20),
            id: 'case1'
        }, [
                createEntity('step', {
                    id: 'Test_Sahi_landing_page',
                    warningTime: 5,
                    startDate: new Date(1970, 1, 1, 10, 30, 0),
                    endDate: new Date(1970, 1, 1, 10, 30, 1, 160)
                }),
                createEntity('step', {
                    id: 'Calculation',
                    warningTime: 10,
                    startDate: new Date(10970, 1, 1, 10, 30, 0, 10),
                    endDate: new Date(1970, 1, 1, 10, 30, 7, 290)
                }),
                createEntity('step', {
                    id: 'Editor',
                    warningTime: 10,
                    startDate: new Date(1970, 1, 1, 10, 30, 0, 20),
                    endDate: new Date(1970, 1, 1, 10, 30, 1, 500)
                })
            ]),
        TestCase_WARNING_IN_STEP: createEntity('case', {
            warningTime: 20,
            criticalTime: 30,
            startDate: new Date(1970, 1, 1, 10, 31, 20),
            endDate: new Date(1970, 1, 1, 10, 31, 33, 430),
            id: 'case2',
        }, [
                createEntity('step', {
                    id: 'Test_Sahi_landing_page_(case2)',
                    warningTime: 5,
                    startDate: new Date(1970, 1, 1, 10, 31, 0, 10),
                    endDate: new Date(1970, 1, 1, 10, 31, 0, 930),
                }),
                createEntity('step', {
                    id: 'Calculation_(case2)',
                    warningTime: 1,
                    startDate: new Date(1970, 1, 1, 10, 31, 0, 20),
                    endDate: new Date(1970, 1, 1, 10, 31, 7, 20)
                }),
                createEntity('step', {
                    id: 'Editor_(case2)',
                    warningTime: 10,
                    startDate: new Date(1970, 1, 1, 10, 31, 0, 30),
                    endDate: new Date(1970, 1, 1, 10, 31, 1, 420)
                })
            ])
    }

    beforeEach(() => {
        templateEnvironment = new TemplateEnvironment(templateDir);
        ctx = new TestExecutionContext(new SimpleLogger);

    });

    describe.each(Object.entries(entities))('%s for main.twig', (key: string, testDataEntity: TestContextEntity) => {

        let properties: Partial<GearmanForwarderProperties>;
        let tpl: any;
        let expected: string;
        beforeEach(() => {
            properties = {
                nagiosHost: 'my.nagios.host'
            }
            tpl = templateEnvironment.getTemplate('main.twig');
            expected = readFileSync(join(__dirname, '__snapshots__', key + '.txt')).toString();
        })

        it('should match static file', () => {
            expect(tpl.render({
                gearman: properties,
                testDataEntity
            })).toEqual(expected)
        })

    })

})