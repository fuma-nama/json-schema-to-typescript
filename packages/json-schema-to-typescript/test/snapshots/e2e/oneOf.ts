/* eslint-disable */
/**
 * This file was automatically generated by json-schema-to-typescript.
 * DO NOT MODIFY IT BY HAND. Instead, modify the source JSONSchema file,
 * and run json-schema-to-typescript to regenerate this file.
 */

export interface OneOf {
  foo: Foo | Bar | Baz;
}
export interface Foo {
  a: string;
  b?: number;
}
export interface Bar {
  a?: "a" | "b" | "c";
  [k: string]: unknown;
}
export interface Baz {
  baz?: Bar;
  [k: string]: unknown;
}
