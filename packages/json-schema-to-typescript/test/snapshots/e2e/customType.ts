/* eslint-disable */
/**
 * This file was automatically generated by json-schema-to-typescript.
 * DO NOT MODIFY IT BY HAND. Instead, modify the source JSONSchema file,
 * and run json-schema-to-typescript to regenerate this file.
 */

/**
 * Map from number to string
 */
export type Foobar = Map<number, string>;

export interface CustomType {
  foo?: Set<number | string>;
  /**
   * Comparator function
   */
  bar?: (a: number, b: number) => number;
  foobar?: Foobar;
}