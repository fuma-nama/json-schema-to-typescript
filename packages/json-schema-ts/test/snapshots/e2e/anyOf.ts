export interface AnyOf {
foo: (Foo | Bar | Baz)
}
export interface Foo {
a: string
b?: number
}
export interface Bar {
a?: ("a" | "b" | "c")
bam?: ("wam")[]
}
export interface Baz {
baz?: Bar
}
