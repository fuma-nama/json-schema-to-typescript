export interface Referencing {
a: ExampleSchema
}
export interface ExampleSchema {
/**
 * @maxItems 5
 */
b?: []|[number]|[number, number]|[number, number, number]|[number, number, number, number]|[number, number, number, number, number]
}
