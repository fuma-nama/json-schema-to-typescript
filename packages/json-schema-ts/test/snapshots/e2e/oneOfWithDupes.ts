export type OneOfWithDupes = { 
	a?: { name?: string };
	b?: A | B;
	c?: C | D;
	d?: C | C | D;
	e?: D | D;
	f?: A | B | C | D | A | B | C | D
 };

export type A = { name?: string };
export type C = number;
export type D = number;
export type B = { name?: string };