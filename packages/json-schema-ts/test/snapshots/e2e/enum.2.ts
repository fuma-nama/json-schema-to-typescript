export interface Enum2 { definitions?: Record<string, EntityObject> }

/**
* My example entity object definition
*/
export interface EntityObject { EntityDataCategory: { APorpertyName?: EntityDataCategory } }

export type EntityDataCategory = 'TABLE' | 'OBJ' | 'FUNC';