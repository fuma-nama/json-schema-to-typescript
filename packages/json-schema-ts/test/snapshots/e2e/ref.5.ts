export interface Referencing {
foo: ExampleSchema
bar: ExampleSchema1
}
export interface ExampleSchema {
firstName: string
lastName: string
/**
 * Age in years
 */
age?: number
height?: number
favoriteFoods?: unknown[]
likesDogs?: boolean
}
export interface ExampleSchema1 {
isConflict: boolean
}
