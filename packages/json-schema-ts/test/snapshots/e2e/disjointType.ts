/*My cool schema*/ export type DisjointType = { 
	value: number | string;
	anotherValue?: null | string;
	nullableStringEnum?: 'foo' | 'bar';
	nullableObj?: null | { foo: string };
	nullableArrayEnums?: null | 'foo' | 'bar'[]
 };