export type A = string;
export interface B {}
export interface C {}

export interface Optimize2 {
	a: string | A;
	b: {  } | {  } | B;
	c: {  } | B | B | C;
	d: {  } & {  };
	e: {  } | {  } & {  }
}