export type LastName = string
export type Height = number

export interface ExampleSchema {
firstName: string
lastName: LastName
/**
 * Age in years
 */
age?: number
height?: Height
favoriteFoods?: unknown[]
likesDogs?: boolean
}
