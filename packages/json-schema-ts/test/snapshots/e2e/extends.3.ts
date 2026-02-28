/**
 * Any Shape
 */
export type Schema = (Circle | Square)

/**
 * A Circle
 */
export interface Circle extends Shape {
type: "circle"
radius: number
}
/**
 * A Shape
 */
export interface Shape {
type: string
id: string
}
/**
 * A Square
 */
export interface Square extends Shape {
type: "square"
height: number
width: number
}
