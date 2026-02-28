export type OneOf = { foo: { a: string; b?: number } | Bar | { baz?: Bar } };
export type Bar = { a?: 'a' | 'b' | 'c' };