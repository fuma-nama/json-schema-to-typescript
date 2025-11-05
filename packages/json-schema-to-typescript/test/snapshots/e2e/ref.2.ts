/**
 * A string with title and enum defined does produce a duplicate Interface
 */
export type FifthDefinitionString = ("one" | "two" | "three")
export type Six = number

export interface LocallyReferencedManifest {
/**
 * Behaviour is the same if definition is referenced as prop within a container
 */
firstContainer?: {
first?: FirstDefinition
}
second?: UnrelatedTitle
third?: ThirdDefinition
fourth?: FourthDefinitionSimpleObject
fifth?: FifthDefinitionString
sixth?: Six
}
/**
 * Title matches definition key for kicks
 */
export interface FirstDefinition {
name?: string
}
/**
 * Title is unrelated to definition key and behaviour is the same
 */
export interface UnrelatedTitle {
name?: string
}
/**
 * Definition has no title and produces no duplicate Interface
 */
export interface ThirdDefinition {
name?: string
}
/**
 * A simple object type with title set and no properties defined produces no duplicate Interface
 */
export interface FourthDefinitionSimpleObject {

}
