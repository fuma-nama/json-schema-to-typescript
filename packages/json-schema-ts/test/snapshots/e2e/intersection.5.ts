export type Intersection5 = A | B;
export type A = Base & { b?: B };
export interface Base { y?: string }
export type B = Base & { x?: string };