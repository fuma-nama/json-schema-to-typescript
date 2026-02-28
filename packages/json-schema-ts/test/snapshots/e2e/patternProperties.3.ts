export interface Parent {
[k: string]: Child
}
/**
 * This interface was referenced by `Parent`'s JSON-Schema definition
 * via the `patternProperty` "^[a-zA-Z]+".
 */
export interface Child {
aProperty?: string
}
