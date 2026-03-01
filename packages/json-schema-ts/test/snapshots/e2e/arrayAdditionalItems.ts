export interface ArrayAdditionalItems {
	namedEums?: { 
		additionalItemsAny?: [(1 | 2 | 3)?];
		additionalItems?: [(1 | 2 | 3)?]
	 };

	unnamedEmums?: { 
		additionalItemsAny?: [(1 | 2 | 3)?];
		additionalItems?: [('One' | 'Two' | 'Three')?]
	 };

	namedSchema?: { 
		additionalItemsAny?: [{ foo?: string }?, { bar?: number }?];
		additionalItems?: [{ foo?: string }?, { bar?: number }?]
	 };

	schema?: { 
		additionalItemsAny?: [{ foo?: string }?, { bar?: number }?];
		additionalItems?: [{ foo?: string }?, { bar?: number }?]
	 };

	ofType?: { 
		additonalItemsAny?: [number?, string?];
		additonalItems?: [number?, string?]
	 };

	refs?: { 
		additionalItemsAny?: [ExampleSchema?];
		additionalItems?: [ExampleSchema1?]
	 };

	defs?: { 
		additionalItemsAny?: [FirstDefinition?];
		additionalItems?: [UnrelatedTitle?]
	 }
}

export interface ExampleSchema {
	firstName: string;
	lastName: string;
	/**
	* Age in years
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
	*/
	age?: number;
	height?: number;
	favoriteFoods?: any[];
	likesDogs?: boolean
}

/**
* Title matches definition key for kicks
*/
export interface FirstDefinition { name?: string }

/**
* Title is unrelated to definition key and behaviour is the same
*/
export interface UnrelatedTitle { name?: string }