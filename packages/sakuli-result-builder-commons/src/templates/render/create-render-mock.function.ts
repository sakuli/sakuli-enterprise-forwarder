import {TestContextEntity, TestContextEntityKind} from "@sakuli/core";
import {mockPartial} from "sneer";

export const createEntity = (kind: TestContextEntityKind, data: Partial<TestContextEntity>, children: TestContextEntity[] = []): TestContextEntity => {
    const mockObject = {
        kind: kind,
        getChildren: jest.fn(() => children),
    };
    Object.assign(mockObject, data);
    return mockPartial<TestContextEntity>(mockObject);
};
