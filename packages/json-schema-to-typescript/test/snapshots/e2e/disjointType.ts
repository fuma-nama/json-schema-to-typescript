/**
 * My cool schema
 */
export interface ExampleSchema {
value: (number | string)
anotherValue?: (null | string)
nullableStringEnum?: (null | ("foo" | "bar"))
nullableObj?: (null | {
foo: string
})
nullableArrayEnums?: (null | ("foo" | "bar")[])
}
