export type ArrayAdditionalItems = { 
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
		additionalItemsAny?: [
			{ 
				firstName: string;
				lastName: string;
				/*Age in years*/ age?: number;
				height?: number;
				favoriteFoods?: any[];
				likesDogs?: boolean
			 }?
		];

		additionalItems?: [
			{ 
				firstName: string;
				lastName: string;
				/*Age in years*/ age?: number;
				height?: number;
				favoriteFoods?: any[];
				likesDogs?: boolean
			 }?
		]
	 };

	defs?: { 
		additionalItemsAny?: [
			/*Title matches definition key for kicks*/ { name?: string }?
		];

		additionalItems?: [
			/*Title is unrelated to definition key and behaviour is the same*/ { name?: string }?
		]
	 }
 };