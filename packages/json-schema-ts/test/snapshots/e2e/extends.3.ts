/**
* A Circle
*/
export interface Circle { type: 'circle'; radius: number }

/**
* A Square
*/
export interface Square { type: 'square'; height: number; width: number }

/**
* Any Shape
*/
export type Extends3 = Circle | Square;