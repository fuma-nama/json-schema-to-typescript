export type C = number
export type D = number

export interface Test {
a?: A
b?: (A | B)
c?: (C | D)
d?: (C | D)
e?: D
f?: (A | B | C | D)
}
export interface A {
name?: string
}
export interface B {
name?: string
}
