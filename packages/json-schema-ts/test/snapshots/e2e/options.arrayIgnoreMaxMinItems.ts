export type OptionsArrayIgnoreMaxMinItems = { 
	array?: { 
		withMinItems?: string[];
		withMaxItems?: string[];
		withMinMaxItems?: string[];
		withMaxItems0?: string[];
		withMinItems0?: string[];
		withMinMaxItems0?: string[]
	 };

	untyped?: { 
		withMinItems?: any[];
		withMaxItems?: any[];
		withMinMaxItems?: any[];
		withMaxItems0?: any[];
		withMinItems0?: any[];
		withMinMaxItems0?: any[]
	 };

	tuple?: { 
		withMinItemsLessThanItemLength?: [1?, 2?, 3?, 4?, 5?, 6?];
		withMinItemsGreaterThanItemLength?: [1?, 2?, 3?, 4?, 5?, 6?];
		withMaxItemsLessThanItemLength?: [1?, 2?, 3?, 4?, 5?, 6?];
		withMaxItemsGreaterThanItemLength?: [1?, 2?, 3?, 4?, 5?, 6?];
		withMinItemsLessThanItemLength_and_MaxItemsGreaterThanItemLength?: [1?, 2?, 3?, 4?, 5?, 6?];
		withMinItemsLessThanItemLength_and_MaxItemsLessThanItemLength?: [1?, 2?, 3?, 4?, 5?, 6?];
		withMinItemsGreaterThanItemLength_and_MaxItemsGreaterThanItemLength?: [1?, 2?, 3?, 4?, 5?, 6?];
		withMaxItems0?: [1?, 2?, 3?, 4?, 5?, 6?];
		withMinItems0?: [1?, 2?, 3?, 4?, 5?, 6?];
		withMinMaxItems0?: [1?, 2?, 3?, 4?, 5?, 6?]
	 }
 };