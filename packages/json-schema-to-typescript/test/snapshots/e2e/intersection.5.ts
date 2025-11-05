export type Intersection = (A | B)
export type A = (Base & {
b?: B
})
export type B = (Base & {
x?: string
})

export interface Base {
y?: string
}
