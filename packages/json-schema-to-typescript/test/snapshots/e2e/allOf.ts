export interface AllOf {
foo: (Foo & Bar)
}
export interface Foo {
a: string
b: number
}
export interface Bar {
a: string
}
