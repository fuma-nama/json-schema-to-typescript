export type Intersection5 = Base & { b?: B } | B;
export type Base = { y?: string };
export type B = Base & { x?: string };