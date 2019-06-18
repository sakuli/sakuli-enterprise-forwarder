import { TestContextEntityKind, TestContextEntity } from "@sakuli/core";

export const createEntity = (kind: TestContextEntityKind, data: Partial<TestContextEntity>, children: TestContextEntity[] = []): TestContextEntity => {
    const e = new (class extends TestContextEntity {
        kind = kind
        getChildren() {
            return children;
        }
    });
    return Object.assign(e, data);
}
