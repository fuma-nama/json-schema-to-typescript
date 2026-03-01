export interface Ref5 { foo: ExampleSchema; bar: ExampleSchema1 }

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

export interface ExampleSchema1 { isConflict: boolean }