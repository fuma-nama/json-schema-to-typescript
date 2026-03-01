export interface SchemaTitleAsTypeName { ref: ExampleSchema }

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