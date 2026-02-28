export type Ref2 = { 
	/*Behaviour is the same if definition is referenced as prop within a container*/ firstContainer?: { 
		/*Title matches definition key for kicks*/ first?: { name?: string }
	 };
	/*Title is unrelated to definition key and behaviour is the same*/ second?: { name?: string };
	/*Definition has no title and produces no duplicate Interface*/ third?: { name?: string };
	/*A simple object type with title set and no properties defined produces no duplicate Interface*/ fourth?: {  };
	/*A string with title and enum defined does produce a duplicate Interface*/ fifth?: 'one' | 'two' | 'three';
	sixth?: number
 };