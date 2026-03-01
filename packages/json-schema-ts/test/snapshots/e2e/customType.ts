export interface CustomType {
	foo?: Set<number|string>;
	/**
	* Comparator function
	*/
	bar?: (a: number, b: number) => number;
	foobar?: Foobar
}

/**
* Map from number to string
*/
export type Foobar = Map<number, string>;