export interface Foo { a: string; b: number }
export interface Bar { a: string }
export interface AllOf { foo: Foo & Bar }