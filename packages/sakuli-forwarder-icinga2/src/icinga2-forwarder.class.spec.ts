import {Project, TestExecutionContext} from "@sakuli/core";
import {Icinga2Forwarder} from "./icinga2-forwarder.class";
import {mockPartial} from 'sneer'
import {SimpleLogger} from "@sakuli/commons";
import { validateProps } from "@sakuli/result-builder-commons";

jest.mock("@sakuli/result-builder-commons", () => ({
        validateProps: jest.fn(),
       }));

describe('Icinga2Forwarder', () => {


    let forwarder: Icinga2Forwarder;
    const props = {
        "sakuli.forwarder.icinga2.enabled": false,
        "sakuli.forwarder.icinga2.api.host": 'https://localhost',
        "sakuli.forwarder.icinga2.api.port": 5665,
        "sakuli.forwarder.icinga2.hostname": 'sakuliclient01',
        "sakuli.forwarder.icinga2.service_description": 'sakuli_demo',
        "sakuli.forwarder.icinga2.api.username": 'root',
        "sakuli.forwarder.icinga2.api.password": '06974567ac6f913e'
    };

      function getProjectWithProps(props: any){
        return mockPartial<Project>({
          has(key: string): boolean {
            return props[key] !== undefined;
          },
          get(key: string): any {
            return props[key];
          }
        })
      }

    let project = getProjectWithProps({});

    let logger = mockPartial<SimpleLogger>({
        info: console.log.bind(console),
        debug: console.log.bind(console)
    });

    let ctx = new TestExecutionContext(logger);

    beforeEach(async () => {
        forwarder = new Icinga2Forwarder();
        await forwarder.setup(project, logger);
        ctx.startExecution();
        ctx.startTestSuite({id: 'Suite'});
        ctx.startTestCase({id: 'Case1'});
        ctx.endTestCase();
        ctx.startTestCase({id: 'Case2'});
        ctx.endTestCase();
        ctx.endTestSuite();
        ctx.endExecution();
    });



    it('should call forward method', async () => {
        await forwarder.forward(ctx);
    });

    it("should not validate props if not available", () => {
            //WHEN
            forwarder.setup(project,logger);

            //THEN
            expect(validateProps).not.toHaveBeenCalled();

        });

    it("should validate props if available", () => {
            //GIVEN
            let project = getProjectWithProps({
            "sakuli.forwarder.icinga2.enabled" : "true"
            });

            //WHEN
            forwarder.setup(project,logger);

            //THEN
            expect(validateProps).toHaveBeenCalled();

    });

    it("should throw error when props are invalie", () => {
            //GIVEN
            let project = getProjectWithProps({
            "sakuli.forwarder.icinga2.enabled" : "123"
            });

            //WHEN
            let setup = forwarder.setup(project,logger)

            //THEN
            expect(setup).rejects.toThrow();

    });


});
