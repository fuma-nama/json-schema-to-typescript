export type AnyOfRoot = { a: string; b?: number } | Bar | { baz?: Bar };
export type Bar = { a?: 'a' | 'b' | 'c' };