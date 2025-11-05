export type Intersection = (A & B & {
c: string
d: string
/**
 * This interface was referenced by `undefined`'s JSON-Schema definition
 * via the `patternProperty` "^x-".
 */
[k: string]: unknown
})

export interface A {
a?: string
}
export interface B {
b?: string
}
