export interface EntityObjectDefinition {
definitions?: {
[k: string]: EntityObject
}
}
/**
 * My example entity object definition
 * 
 * This interface was referenced by `undefined`'s JSON-Schema definition
 * via the `patternProperty` "^[a-zA-Z0-9_. /]+$".
 */
export interface EntityObject {
EntityDataCategory: {
APorpertyName?: EntityDataCategory
}
}

export const enum EntityDataCategory {
Table = "TABLE",
Field = "OBJ",
Func = "FUNC"
}

