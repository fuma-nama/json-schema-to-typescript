export interface A { name?: string }
export interface B { name?: string }
export type C = number;
export type D = number;

export interface OneOfWithDupes {
	a?: A;
	b?: A | B;
	c?: C | D;
	d?: C | C | D;
	e?: D | D;
	f?: A | B | C | D | A | B | C | D
}