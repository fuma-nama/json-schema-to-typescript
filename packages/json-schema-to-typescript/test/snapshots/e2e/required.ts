/* eslint-disable */
/**
 * This file was automatically generated by json-schema-to-typescript.
 * DO NOT MODIFY IT BY HAND. Instead, modify the source JSONSchema file,
 * and run json-schema-to-typescript to regenerate this file.
 */

export interface Required {
  location: Location & {
    [k: string]: unknown;
  };
  name: string;
  website?: string;
}
export interface Location {
  city?: string;
  postalCode?: number;
  [k: string]: unknown;
}