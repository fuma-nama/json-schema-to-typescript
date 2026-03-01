/**
* @default `true`
*/
export type RealWorldJsonschema = 
	{ 
		/**
		* @format `uri-reference`
		*/
		$id?: string;

		/**
		* @format `uri`
		*/
		$schema?: string;

		/**
		* @format `uri-reference`
		*/
		$ref?: string;
		$comment?: string;
		title?: string;
		description?: string;
		default?: any;
		/**
		* @default `false`
		*/
		readOnly?: boolean;

		/**
		* @default `false`
		*/
		writeOnly?: boolean;
		examples?: any[];
		/**
		* @exclusiveMinimum `0`
		*/
		multipleOf?: number;
		maximum?: number;
		exclusiveMaximum?: number;
		minimum?: number;
		exclusiveMinimum?: number;
		maxLength?: NonNegativeInteger;
		minLength?: NonNegativeIntegerDefault0;
		/**
		* @format `regex`
		*/
		pattern?: string;
		additionalItems?: RealWorldJsonschema;
		/**
		* @default `true`
		*/
		items?: RealWorldJsonschema | SchemaArray;
		maxItems?: NonNegativeInteger;
		minItems?: NonNegativeIntegerDefault0;
		/**
		* @default `false`
		*/
		uniqueItems?: boolean;
		contains?: RealWorldJsonschema;
		maxProperties?: NonNegativeInteger;
		minProperties?: NonNegativeIntegerDefault0;
		required?: StringArray;
		additionalProperties?: RealWorldJsonschema;
		/**
		* @default `{}`
		*/
		definitions?: Record<string, RealWorldJsonschema>;

		/**
		* @default `{}`
		*/
		properties?: Record<string, RealWorldJsonschema>;

		/**
		* @default `{}`
		*/
		patternProperties?: Record<string, RealWorldJsonschema>;
		dependencies?: Record<string, RealWorldJsonschema | StringArray>;
		propertyNames?: RealWorldJsonschema;
		const?: any;
		/**
		* @minItems `1`
		* @uniqueItems
		*/
		enum?: any[];

		type?: 
			SimpleTypes |
			/**
			* @minItems `1`
			* @uniqueItems
			*/
			SimpleTypes[]
		;
		format?: string;
		contentMediaType?: string;
		contentEncoding?: string;
		if?: RealWorldJsonschema;
		then?: RealWorldJsonschema;
		else?: RealWorldJsonschema;
		allOf?: SchemaArray;
		anyOf?: SchemaArray;
		oneOf?: SchemaArray;
		not?: RealWorldJsonschema
	 } |
	boolean
;

/**
* @minimum `0`
*/
export type NonNegativeInteger = number;

export type NonNegativeIntegerDefault0 = 
	NonNegativeInteger &
	/**
	* @default `0`
	*/
	unknown
;

/**
* @minItems `1`
*/
export type SchemaArray = RealWorldJsonschema[];

/**
* @uniqueItems
* @default `[]`
*/
export type StringArray = string[];

export type SimpleTypes = 
	'array' |
	'boolean' |
	'integer' |
	'null' |
	'number' |
	'object' |
	'string'
;