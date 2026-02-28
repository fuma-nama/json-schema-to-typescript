export type Intersection7 = { 
	A: string;
	B: string;
	C: string & null;
	D: string | null;
	E: MyString & null;
	F: string & MyNullable;
	G: MyString & MyNullable;
	H: 'foo' | 'bar' & MyNullable;
	I: string | number & null;
	J: { foo: string; bar: number } & MyNullable
 };

export type MyString = string;
export type MyNullable = null;