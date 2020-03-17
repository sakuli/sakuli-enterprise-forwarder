import { readFileSync } from 'fs';
import { join } from "path";
import { TestCaseContext, TestContextEntity, TestSuiteContext } from "@sakuli/core";
import { TestSuites } from './__mocks__';
import { CheckMkTestResultOutputBuilder } from "./index";
import { TestSuite_OK } from "./__mocks__/test-suite-ok.entity";
import { TestCase_OK } from "./__mocks__/test-case-ok.entity";
import { TestSuite_ERRORS } from "./__mocks__/test-suite-error.entity";
import { stripIndents } from "common-tags";

describe('checkmk result builder', () => {
    let renderer: CheckMkTestResultOutputBuilder;
    const errorTestSuite = readFileSync(join(__dirname, '__snapshots__', 'suites', 'TestSuite_ERRORS.txt')).toString();
    const errorScreenshot = readFileSync(join(__dirname, '__snapshots__', 'screenshots', 'Screenshot_ERROR.txt')).toString();

    beforeEach(() => {
        renderer = new CheckMkTestResultOutputBuilder();
    });

    describe('suite templates', () => {
        describe.each(Object.entries(TestSuites))('for %s', (key: string, testContextEntity: TestContextEntity) => {
            let properties: any;
            let expected: string;
            beforeEach(() => {
                properties = {
                    serviceDescription: "service_description",
                    sectionName: "local",
                    outputDetails: true,
                };
                expected = readFileSync(join(__dirname, '__snapshots__', 'suites', key + '.txt')).toString();
            });

            it('should match static file', () => {
                const rendered = renderer.render(testContextEntity, {
                    currentSuite: TestSuite_OK as TestSuiteContext,
                    currentCase: TestCase_OK as TestCaseContext,
                    props: properties
                });
                expect(rendered).toEqual(expected)
            })
        });

        describe('render error', () => {
            it('should match static file', () => {
                //GIVEN
                const properties = {
                    serviceDescription: "service_description",
                    sectionName: "local",
                    outputDetails: true,
                };

                //WHEN
                const rendered = renderer.render(TestSuite_ERRORS, {
                    currentSuite: TestSuite_ERRORS as TestSuiteContext,
                    currentCase: undefined,
                    props: properties
                });

                //THEN
                expect(rendered).toContain(errorTestSuite);
                expect(rendered).toContain(errorScreenshot);
            })
        });

        describe('render error without details', () => {
            it('should match static file', () => {
                //GIVEN
                const properties = {
                    serviceDescription: "service_description",
                    sectionName: "local",
                    outputDetails: false,
                };

                //WHEN
                const rendered = renderer.render(TestSuite_ERRORS, {
                    currentSuite: TestSuite_ERRORS as TestSuiteContext,
                    currentCase: undefined,
                    props: properties
                });

                //THEN
                expect(rendered).toContain(errorTestSuite);
                expect(rendered).not.toContain(errorScreenshot);
            })
        })
    });

    describe('piggyback templates', () => {

        describe.each(Object.entries(TestSuites))('for %s', (key: string, testContextEntity: TestContextEntity) => {
            let properties: any;
            let expected: string;
            beforeEach(() => {
                properties = {
                    serviceDescription: "service_description",
                    sectionName: "local",
                    outputDetails: true,
                    piggybackHostname: "piggyback_host",
                };
                const content = stripIndents`${readFileSync(join(__dirname, '__snapshots__', 'suites', key + '.txt')).toString()}`;
                expected = `${stripIndents`<<<<${properties.piggybackHostname}>>>>
                ${content}
                <<<<>>>>
                `}\n`
            });

            it('should match static file', () => {
                const rendered = renderer.render(testContextEntity, {
                    currentSuite: TestSuite_OK as TestSuiteContext,
                    currentCase: TestCase_OK as TestCaseContext,
                    props: properties
                });
                expect(rendered).toEqual(expected)
            })
        });

        describe('render error', () => {
            it('should match static file', () => {
                //GIVEN
                const properties = {
                    serviceDescription: "service_description",
                    sectionName: "local",
                    outputDetails: true,
                    piggybackHostname: "piggyback_host",
                };
                const expectedTestSuite = stripIndents`<<<<${properties.piggybackHostname}>>>>
                                             ${errorTestSuite}
                                             `;

                //WHEN
                const rendered = renderer.render(TestSuite_ERRORS, {
                    currentSuite: TestSuite_ERRORS as TestSuiteContext,
                    currentCase: undefined,
                    props: properties
                });

                //THEN
                expect(rendered).toContain(expectedTestSuite);
                expect(rendered).toContain(stripIndents`${errorScreenshot}
                                                        <<<<>>>>`)
            })
        });

        describe('render error without details', () => {
            it('should match static file', () => {
                //GIVEN
                const properties = {
                    serviceDescription: "service_description",
                    sectionName: "local",
                    outputDetails: false,
                    piggybackHostname: "piggyback_host",
                };
                const expectedTestSuite = stripIndents`<<<<${properties.piggybackHostname}>>>>
                                              ${errorTestSuite}
                                              <<<<>>>>
                                              `;

                //WHEN
                const rendered = renderer.render(TestSuite_ERRORS, {
                    currentSuite: TestSuite_ERRORS as TestSuiteContext,
                    currentCase: undefined,
                    props: properties
                });

                //THEN
                expect(rendered).toContain(expectedTestSuite);
                expect(rendered).not.toContain(errorScreenshot);
            })
        });
    });

    describe('piggyback transport requires hostname', () => {
        describe.each(Object.entries(TestSuites))('Empty piggyback hostname for %s', (key: string, testContextEntity: TestContextEntity) => {
            let properties: any;
            let expected: string;
            beforeEach(() => {
                properties = {
                    serviceDescription: "service_description",
                    sectionName: "local",
                    outputDetails: true,
                    piggybackHostname: "",
                };
                expected = readFileSync(join(__dirname, '__snapshots__', 'suites', key + '.txt')).toString();
            });

            it('should not render piggyback router', () => {
                const rendered = renderer.render(testContextEntity, {
                    currentSuite: TestSuite_OK as TestSuiteContext,
                    currentCase: TestCase_OK as TestCaseContext,
                    props: properties
                });
                expect(rendered).toEqual(expected)
            })
        });

        describe('render error with empty piggybackHostname', () => {
            it('should not render piggyback router', () => {
                //GIVEN
                const properties = {
                    serviceDescription: "service_description",
                    sectionName: "local",
                    outputDetails: true,
                    piggybackHostname: "",
                };

                //WHEN
                const rendered = renderer.render(TestSuite_ERRORS, {
                    currentSuite: TestSuite_ERRORS as TestSuiteContext,
                    currentCase: undefined,
                    props: properties
                });

                //THEN
                expect(rendered).toContain(errorTestSuite);
                expect(rendered).toContain(errorScreenshot);
            })
        });

        describe('render error with piggybackHostname null', () => {
            it('should not render piggyback router', () => {
                //GIVEN
                const properties = {
                    serviceDescription: "service_description",
                    sectionName: "local",
                    outputDetails: true,
                    piggybackHostname: null
                };

                //WHEN
                const rendered = renderer.render(TestSuite_ERRORS, {
                    currentSuite: TestSuite_ERRORS as TestSuiteContext,
                    currentCase: undefined,
                    props: properties
                });

                //THEN
                expect(rendered).toContain(errorTestSuite);
                expect(rendered).toContain(errorScreenshot);
            })
        });

        describe('render error without details and undefined piggyback hostname', () => {
            it('should not render piggyback router', () => {
                //GIVEN
                const properties = {
                    serviceDescription: "service_description",
                    sectionName: "local",
                    outputDetails: false,
                    piggybackHostname: undefined
                };
                //WHEN
                const rendered = renderer.render(TestSuite_ERRORS, {
                    currentSuite: TestSuite_ERRORS as TestSuiteContext,
                    currentCase: undefined,
                    props: properties
                });

                //THEN
                expect(rendered).toContain(errorTestSuite);
                expect(rendered).not.toContain(errorScreenshot);
            })
        });
    });

    describe('with section name configuration', () => {

        const testSuiteWithSectionConfigured =
            readFileSync(join(__dirname, '__snapshots__', 'suites', 'TestSuite_OK_with_Section.txt')).toString();

        const testSuiteWithDefaultSection =
            readFileSync(join(__dirname, '__snapshots__', 'suites', 'TestSuite_OK.txt')).toString();

        it('should print section name', () => {
            //GIVEN
            const properties = {
                serviceDescription: "service_description",
                outputDetails: true,
                sectionName: "Isengard",
            };

            //WHEN
            const rendered = renderer.render(TestSuite_OK, {
                currentSuite: TestSuite_OK as TestSuiteContext,
                currentCase: TestCase_OK as TestCaseContext,
                props: properties
            });

            //THEN
            expect(rendered).toContain(testSuiteWithSectionConfigured);
        });

        it('should print section name default if not configured', () => {
            //GIVEN
            const properties = {
                serviceDescription: "service_description",
                sectionName: "local",
                outputDetails: true,
            };

            //WHEN
            const rendered = renderer.render(TestSuite_OK, {
                currentSuite: TestSuite_OK as TestSuiteContext,
                currentCase: TestCase_OK as TestCaseContext,
                props: properties
            });

            //THEN
            expect(rendered).toContain(testSuiteWithDefaultSection);
        });

        it('should print section name in combination with piggyback host', () => {
            //GIVEN
            const properties = {
                serviceDescription: "service_description",
                outputDetails: true,
                sectionName: "Isengard",
                piggybackHostname: "piggyback_host",
            };

            //WHEN
            const rendered = renderer.render(TestSuite_OK, {
                currentSuite: TestSuite_OK as TestSuiteContext,
                currentCase: TestCase_OK as TestCaseContext,
                props: properties
            });

            //THEN
            expect(rendered).toContain(stripIndents`<<<<${properties.piggybackHostname}>>>>
                                                    ${testSuiteWithSectionConfigured}
                                                    <<<<>>>>`);
        });
    });

    describe('with url configuration', () => {

        const testSuiteWithUrl =
            readFileSync(join(__dirname, '__snapshots__', 'suites', 'TestSuite_OK_with_Url.txt')).toString();
        const testSuiteWithoutUrl =
            readFileSync(join(__dirname, '__snapshots__', 'suites', 'TestSuite_OK_with_Section.txt')).toString();

        it('should print url', () => {
            //GIVEN
            const properties = {
                serviceDescription: "service_description",
                outputDetails: true,
                sectionName: "Isengard",
                url: "https://sakuli.io"
            };

            //WHEN
            const rendered = renderer.render(TestSuite_OK, {
                currentSuite: TestSuite_OK as TestSuiteContext,
                currentCase: TestCase_OK as TestCaseContext,
                props: properties
            });

            //THEN
            expect(rendered).toContain(testSuiteWithUrl);
        });

        it.each<any>([
            undefined,
            null,
            ""
            ])("should print empty url for '%s'", (url: any) => {
            //GIVEN
            const properties = {
                serviceDescription: "service_description",
                outputDetails: true,
                sectionName: "Isengard",
                url
            };

            //WHEN
            const rendered = renderer.render(TestSuite_OK, {
                currentSuite: TestSuite_OK as TestSuiteContext,
                currentCase: TestCase_OK as TestCaseContext,
                props: properties
            });

            //THEN
            expect(rendered).toContain(testSuiteWithoutUrl);
        });
    });
});
