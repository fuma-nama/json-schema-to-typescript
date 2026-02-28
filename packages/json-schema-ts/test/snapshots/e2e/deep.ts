export type Deep = { 
	foo: 
		number | { a: string; b: number } | Bar | { baz?: number } |
		Bar
 };

export type Bar = { a: string };