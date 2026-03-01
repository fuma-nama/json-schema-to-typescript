/**
* My cool schema
*/
export interface WithDescription {
	firstName: string;
	lastName: string;
	/**
	* Age in years
	* @minimum `0`
	*/
	age?: number
}