import { TestContextEntity } from "@sakuli/core/dist";

export type ParentMap = Map<TestContextEntity, TestContextEntity>;

export function createParentMap(entity: TestContextEntity): ParentMap {
    return new Map([
        ...entity.getChildren()
            .map((child): [TestContextEntity, TestContextEntity][] => [[child, entity], ...createParentMap(child).entries()])
            .reduce((flatted, expanded) => [...flatted, ...expanded], [])
    ])
}
