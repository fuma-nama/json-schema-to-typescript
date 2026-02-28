export interface Referencing {
ref: ExampleSchema
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
