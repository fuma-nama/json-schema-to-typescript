export interface Ref4 { foo: ExampleSchema }

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