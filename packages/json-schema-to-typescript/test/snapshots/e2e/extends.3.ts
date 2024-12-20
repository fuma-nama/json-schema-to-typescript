/* eslint-disable */
/**
 * This file was automatically generated by json-schema-to-typescript.
 * DO NOT MODIFY IT BY HAND. Instead, modify the source JSONSchema file,
 * and run json-schema-to-typescript to regenerate this file.
 */

/**
 * Any Shape
 */
export type Schema = Circle | Square;

/**
 * A Circle
 */
export interface Circle extends Shape {
  type: "circle";
  radius: number;
}
/**
 * A Shape
 */
export interface Shape {
  type: string;
  id: string;
}
/**
 * A Square
 */
export interface Square extends Shape {
  type: "square";
  height: number;
  width: number;
}
