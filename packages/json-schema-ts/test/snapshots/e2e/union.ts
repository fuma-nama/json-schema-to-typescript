export interface Union {
	test?: { 
		/**
		* @minItems `1`
		*/
		test1?: boolean | string[];

		/**
		* @minItems `1`
		*/
		test2?: boolean | string[]
	 }
}