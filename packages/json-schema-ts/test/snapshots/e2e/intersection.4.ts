export type A = Base;
export interface Base { y?: string }
export type B = Base;
export type Intersection4 = A | B;