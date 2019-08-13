import {CheckMkForwarderProperties} from "./checkmk-forwarder-properties.class";
import {createSpoolFileName} from "./create-spool-file.function";
import {TestContextEntity, TestContextEntityKind} from "@sakuli/core";

describe("spool file", () => {
    it("should be with default prefix", () => {
        // GIVEN
        const props = new CheckMkForwarderProperties();
        const id = "entityId";
        const kind: TestContextEntityKind = "suite";
        const entity = new (class extends TestContextEntity {
            public id = id;
            public kind = kind;

            getChildren() {
                return []
            }
        });

        // WHEN
        const result = createSpoolFileName(entity, props);

        // THEN
        expect(result).toBe(`${props.freshness}_${props.spoolfilePrefix}_${id}`)
    });

    it("should be allow to skip prefix", () => {
        // GIVEN
        const props = new CheckMkForwarderProperties();
        props.spoolfilePrefix = "";
        const id = "entityId";
        const kind: TestContextEntityKind = "suite";
        const entity = new (class extends TestContextEntity {
            public id = id;
            public kind = kind;

            getChildren() {
                return []
            }
        });

        // WHEN
        const result = createSpoolFileName(entity, props);

        // THEN
        expect(result).toBe(`${props.freshness}_${id}`)
    })
});