export type CustomType = { 
	foo?: Set<number|string>;
	/*Comparator function*/ bar?: (a: number, b: number) => number;
	/*Map from number to string*/ foobar?: Map<number, string>
 };