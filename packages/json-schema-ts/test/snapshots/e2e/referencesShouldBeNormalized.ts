export interface ReferencesShouldBeNormalized { a: ExampleSchema }

export interface ExampleSchema {
	/**
	* @maxItems `5`
	*/
	b?: number[]
}