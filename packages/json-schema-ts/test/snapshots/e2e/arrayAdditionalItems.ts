export interface ArrayAdditionalItems {
	namedEums?: { 
		additionalItemsAny?: [(1 | 2 | 3)?, ...any[]];
		additionalItems?: [(1 | 2 | 3)?, ...(4 | 5 | 6)[]]
	 };

	unnamedEmums?: { 
		additionalItemsAny?: [(1 | 2 | 3)?, ...any[]];
		additionalItems?: [('One' | 'Two' | 'Three')?, ...(4 | 5 | 6)[]]
	 };

	namedSchema?: { 
		additionalItemsAny?: [{ foo?: string }?, { bar?: number }?, ...any[]];
		additionalItems?: [{ foo?: string }?, { bar?: number }?, ...{ baz?: boolean }[]]
	 };

	schema?: { 
		additionalItemsAny?: [{ foo?: string }?, { bar?: number }?, ...any[]];
		additionalItems?: [{ foo?: string }?, { bar?: number }?, ...{ baz?: boolean }[]]
	 };

	ofType?: { 
		additonalItemsAny?: [number?, string?, ...any[]];
		additonalItems?: [number?, string?, ...boolean[]]
	 };

	refs?: { 
		additionalItemsAny?: [ExampleSchema?, ...any[]];
		additionalItems?: [ExampleSchema1?, ...ExampleSchema2[]]
	 };

	defs?: { 
		additionalItemsAny?: [FirstDefinition?, ...any[]];
		additionalItems?: [UnrelatedTitle?, ...ThirdDefinition[]]
	 }
}

export interface ExampleSchema {
	firstName: string;
	lastName: string;
	/**
	* Age in years
	* @minimum `0`
	*/
	age?: number;
	height?: number;
	favoriteFoods?: any[];
	likesDogs?: boolean
}

export interface ExampleSchema1 {
	firstName: string;
	lastName: string;
	/**
	* Age in years
	* @minimum `0`
	*/
	age?: number;
	height?: number;
	favoriteFoods?: any[];
	likesDogs?: boolean
}

export interface ExampleSchema2 { isConflict: boolean }

/**
* Title matches definition key for kicks
*/
export interface FirstDefinition { name?: string }

/**
* Title is unrelated to definition key and behaviour is the same
*/
export interface UnrelatedTitle { name?: string }

/**
* Definition has no title and produces no duplicate Interface
*/
export interface ThirdDefinition { name?: string }