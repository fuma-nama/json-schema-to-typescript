export interface OneOf { foo: Foo | Bar | Baz }
export interface Foo { a: string; b?: number }
export interface Bar { a?: 'a' | 'b' | 'c' }
export interface Baz { baz?: Bar }