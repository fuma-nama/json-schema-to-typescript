export type Intersection = ({
a: A
b: B
} & (C | D))

export interface A {
a: string
}
export interface B {
b: string
}
export interface C {
c: string
}
export interface D {
d: string
}
