export type A = C | D;
export interface C { c?: string }
export interface D { d?: string }
export type B = C | D;
export type Union5 = A | B;