export interface OptionsArrayIgnoreMaxMinItems {
	array?: { 
		/**
		* @minItems `3`
		*/
		withMinItems?: string[];

		/**
		* @maxItems `3`
		*/
		withMaxItems?: string[];

		/**
		* @minItems `3`
		* @maxItems `8`
		*/
		withMinMaxItems?: string[];

		/**
		* @maxItems `0`
		*/
		withMaxItems0?: string[];

		/**
		* @minItems `0`
		*/
		withMinItems0?: string[];

		/**
		* @minItems `0`
		* @maxItems `0`
		*/
		withMinMaxItems0?: string[]
	 };

	untyped?: { 
		/**
		* @minItems `3`
		*/
		withMinItems?: any[];

		/**
		* @maxItems `3`
		*/
		withMaxItems?: any[];

		/**
		* @minItems `3`
		* @maxItems `8`
		*/
		withMinMaxItems?: any[];

		/**
		* @maxItems `0`
		*/
		withMaxItems0?: any[];

		/**
		* @minItems `0`
		*/
		withMinItems0?: any[];

		/**
		* @minItems `0`
		* @maxItems `0`
		*/
		withMinMaxItems0?: any[]
	 };

	tuple?: { 
		/**
		* @minItems `2`
		*/
		withMinItemsLessThanItemLength?: [1?, 2?, 3?, 4?, 5?, 6?];

		/**
		* @minItems `8`
		*/
		withMinItemsGreaterThanItemLength?: [1?, 2?, 3?, 4?, 5?, 6?];

		/**
		* @maxItems `2`
		*/
		withMaxItemsLessThanItemLength?: [1?, 2?, 3?, 4?, 5?, 6?];

		/**
		* @maxItems `8`
		*/
		withMaxItemsGreaterThanItemLength?: [1?, 2?, 3?, 4?, 5?, 6?];

		/**
		* @minItems `4`
		* @maxItems `8`
		*/
		withMinItemsLessThanItemLength_and_MaxItemsGreaterThanItemLength?: [1?, 2?, 3?, 4?, 5?, 6?];

		/**
		* @minItems `2`
		* @maxItems `4`
		*/
		withMinItemsLessThanItemLength_and_MaxItemsLessThanItemLength?: [1?, 2?, 3?, 4?, 5?, 6?];

		/**
		* @minItems `8`
		* @maxItems `10`
		*/
		withMinItemsGreaterThanItemLength_and_MaxItemsGreaterThanItemLength?: [1?, 2?, 3?, 4?, 5?, 6?];

		/**
		* @maxItems `0`
		*/
		withMaxItems0?: [1?, 2?, 3?, 4?, 5?, 6?];

		/**
		* @minItems `0`
		*/
		withMinItems0?: [1?, 2?, 3?, 4?, 5?, 6?];

		/**
		* @minItems `0`
		* @maxItems `0`
		*/
		withMinMaxItems0?: [1?, 2?, 3?, 4?, 5?, 6?]
	 }
}