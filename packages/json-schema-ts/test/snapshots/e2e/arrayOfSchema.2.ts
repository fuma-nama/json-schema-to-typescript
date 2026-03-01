export type ArrayOfSchema2 = /**
* @minItems `1`
*/
{ 
	description: string;
	schema: unknown;
	/**
	* @minItems `1`
	*/
	tests: { description: string; data: unknown; valid: boolean }[]
 }[];