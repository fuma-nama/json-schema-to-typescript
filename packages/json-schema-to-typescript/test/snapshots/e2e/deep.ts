export interface Deep {
foo: ((number | Foo | Bar | {
baz?: number
}) | Bar)
}
export interface Foo {
a: string
b: number
}
export interface Bar {
a: string
}
