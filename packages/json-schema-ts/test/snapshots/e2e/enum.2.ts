export interface Enum2 {
	/**
	* @minProperties `1`
	*/
	definitions?: Record<string, EntityObject>
}

/**
* My example entity object definition
*/
export interface EntityObject { EntityDataCategory: { APorpertyName?: EntityDataCategory } }

export type EntityDataCategory = 'TABLE' | 'OBJ' | 'FUNC';