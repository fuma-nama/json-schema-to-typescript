/* eslint-disable */
/**
 * This file was automatically generated by json-schema-to-typescript.
 * DO NOT MODIFY IT BY HAND. Instead, modify the source JSONSchema file,
 * and run json-schema-to-typescript to regenerate this file.
 */

export interface ArrayMaxMinItems {
  array?: {
    /**
     * @minItems 3
     */
    withMinItems?: [string, string, string, ...string[]];
    /**
     * @maxItems 3
     */
    withMaxItems?: [] | [string] | [string, string] | [string, string, string];
    /**
     * @minItems 3
     * @maxItems 8
     */
    withMinMaxItems?:
      | [string, string, string]
      | [string, string, string, string]
      | [string, string, string, string, string]
      | [string, string, string, string, string, string]
      | [string, string, string, string, string, string, string]
      | [string, string, string, string, string, string, string, string];
    /**
     * @maxItems 0
     */
    withMaxItems0?: [];
    /**
     * @minItems 0
     */
    withMinItems0?: string[];
    /**
     * @minItems 0
     * @maxItems 0
     */
    withMinMaxItems0?: [];
  };
  untyped?: {
    /**
     * @minItems 3
     */
    withMinItems?: [unknown, unknown, unknown, ...unknown[]];
    /**
     * @maxItems 3
     */
    withMaxItems?: [] | [unknown] | [unknown, unknown] | [unknown, unknown, unknown];
    /**
     * @minItems 3
     * @maxItems 8
     */
    withMinMaxItems?:
      | [unknown, unknown, unknown]
      | [unknown, unknown, unknown, unknown]
      | [unknown, unknown, unknown, unknown, unknown]
      | [unknown, unknown, unknown, unknown, unknown, unknown]
      | [unknown, unknown, unknown, unknown, unknown, unknown, unknown]
      | [unknown, unknown, unknown, unknown, unknown, unknown, unknown, unknown];
    /**
     * @maxItems 0
     */
    withMaxItems0?: [];
    /**
     * @minItems 0
     */
    withMinItems0?: unknown[];
    /**
     * @minItems 0
     * @maxItems 0
     */
    withMinMaxItems0?: [];
  };
  tuple?: {
    /**
     * @minItems 2
     */
    withMinItemsLessThanItemLength?: [1, 2] | [1, 2, 3] | [1, 2, 3, 4] | [1, 2, 3, 4, 5] | [1, 2, 3, 4, 5, 6];
    /**
     * @minItems 8
     */
    withMinItemsGreaterThanItemLength?: [1, 2, 3, 4, 5, 6, ...unknown[]];
    /**
     * @maxItems 2
     */
    withMaxItemsLessThanItemLength?: [] | [1] | [1, 2];
    /**
     * @maxItems 8
     */
    withMaxItemsGreaterThanItemLength?:
      | []
      | [1]
      | [1, 2]
      | [1, 2, 3]
      | [1, 2, 3, 4]
      | [1, 2, 3, 4, 5]
      | [1, 2, 3, 4, 5, 6]
      | [1, 2, 3, 4, 5, 6, unknown]
      | [1, 2, 3, 4, 5, 6, unknown, unknown];
    /**
     * @minItems 4
     * @maxItems 8
     */
    withMinItemsLessThanItemLength_and_MaxItemsGreaterThanItemLength?:
      | [1, 2, 3, 4]
      | [1, 2, 3, 4, 5]
      | [1, 2, 3, 4, 5, 6]
      | [1, 2, 3, 4, 5, 6, unknown]
      | [1, 2, 3, 4, 5, 6, unknown, unknown];
    /**
     * @minItems 2
     * @maxItems 4
     */
    withMinItemsLessThanItemLength_and_MaxItemsLessThanItemLength?: [1, 2] | [1, 2, 3] | [1, 2, 3, 4];
    /**
     * @minItems 8
     * @maxItems 10
     */
    withMinItemsGreaterThanItemLength_and_MaxItemsGreaterThanItemLength?:
      | [1, 2, 3, 4, 5, 6, unknown, unknown]
      | [1, 2, 3, 4, 5, 6, unknown, unknown, unknown]
      | [1, 2, 3, 4, 5, 6, unknown, unknown, unknown, unknown];
    /**
     * @maxItems 0
     */
    withMaxItems0?: [];
    /**
     * @minItems 0
     */
    withMinItems0?: [] | [1] | [1, 2] | [1, 2, 3] | [1, 2, 3, 4] | [1, 2, 3, 4, 5] | [1, 2, 3, 4, 5, 6];
    /**
     * @minItems 0
     * @maxItems 0
     */
    withMinMaxItems0?: [];
  };
}