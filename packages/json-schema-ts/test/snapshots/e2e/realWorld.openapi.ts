/**
* Validation schema for OpenAPI Specification 3.0.X.
*/
export type RealWorldOpenapi = 
	{ 
		/**
		* @pattern `^3\.0\.\d(-.+)?$`
		*/
		openapi: string;
		info: Info;
		externalDocs?: ExternalDocumentation;
		servers?: Server[];
		security?: SecurityRequirement[];
		/**
		* @uniqueItems
		*/
		tags?: Tag[];
		paths: Paths;
		components?: Components
	 } &
	Record<string, unknown>
;

export type Info = 
	{ 
		title: string;
		description?: string;
		/**
		* @format `uri-reference`
		*/
		termsOfService?: string;
		contact?: Contact;
		license?: License;
		version: string
	 } &
	Record<string, unknown>
;

export type Contact = 
	{ 
		name?: string;
		/**
		* @format `uri-reference`
		*/
		url?: string;

		/**
		* @format `email`
		*/
		email?: string
	 } &
	Record<string, unknown>
;

export type License = 
	{ 
		name: string;
		/**
		* @format `uri-reference`
		*/
		url?: string
	 } &
	Record<string, unknown>
;

export type ExternalDocumentation = 
	{ 
		description?: string;
		/**
		* @format `uri-reference`
		*/
		url: string
	 } &
	Record<string, unknown>
;

export type Server = 
	{ 
		url: string;
		description?: string;
		variables?: Record<string, ServerVariable>
	 } &
	Record<string, unknown>
;

export type ServerVariable = 
	{ enum?: string[]; default: string; description?: string } &
	Record<string, unknown>
;

export type SecurityRequirement = Record<string, string[]>;

export type Tag = 
	{ 
		name: string;
		description?: string;
		externalDocs?: ExternalDocumentation
	 } &
	Record<string, unknown>
;

export type Paths = Record<string, PathItem | unknown>;

export type PathItem = 
	{ 
		$ref?: string;
		summary?: string;
		description?: string;
		servers?: Server[];
		/**
		* @uniqueItems
		*/
		parameters?: (Parameter | Reference)[]
	 } &
	Record<string, Operation | unknown>
;

export type Parameter = ExampleXORExamples & SchemaXORContent & ParameterLocation;

/**
* Example and examples are mutually exclusive
*/
export type ExampleXORExamples = Exclude<unknown, Record<'example' | 'examples', unknown>>;

/**
* Schema and content are mutually exclusive, at least one is required
*/
export type SchemaXORContent = Exclude<unknown, Record<'schema' | 'content', unknown>>;

/**
* Parameter location
*/
export type ParameterLocation = 
	/**
	* Parameter in path
	*/
	{ 
		in?: 'path';
		/**
		* @default `simple`
		*/
		style?: 'matrix' | 'label' | 'simple';
		required: true
	 } |

	/**
	* Parameter in query
	*/
	{ 
		in?: 'query';
		/**
		* @default `form`
		*/
		style?: 'form' | 'spaceDelimited' | 'pipeDelimited' | 'deepObject'
	 } |

	/**
	* Parameter in header
	*/
	{ 
		in?: 'header';
		/**
		* @default `simple`
		*/
		style?: 'simple'
	 } |

	/**
	* Parameter in cookie
	*/
	{ 
		in?: 'cookie';
		/**
		* @default `form`
		*/
		style?: 'form'
	 }
;

export type Reference = Record<string, /**
* @format `uri-reference`
*/
string>;

export type Operation = 
	{ 
		tags?: string[];
		summary?: string;
		description?: string;
		externalDocs?: ExternalDocumentation;
		operationId?: string;
		/**
		* @uniqueItems
		*/
		parameters?: (Parameter | Reference)[];
		requestBody?: RequestBody | Reference;
		responses: Responses;
		callbacks?: Record<string, Callback | Reference>;
		/**
		* @default `false`
		*/
		deprecated?: boolean;
		security?: SecurityRequirement[];
		servers?: Server[]
	 } &
	Record<string, unknown>
;

export type RequestBody = 
	{ 
		description?: string;
		content: Record<string, MediaType>;
		/**
		* @default `false`
		*/
		required?: boolean
	 } &
	Record<string, unknown>
;

export type MediaType = ExampleXORExamples;

/**
* @minProperties `1`
*/
export type Responses = 
	{ default?: Response | Reference } &
	Record<string, Response | Reference | unknown>
;

export type Response = 
	{ 
		description: string;
		headers?: Record<string, Header | Reference>;
		content?: Record<string, MediaType>;
		links?: Record<string, Link | Reference>
	 } &
	Record<string, unknown>
;

export type Header = ExampleXORExamples & SchemaXORContent;
export type Link = Exclude<unknown, Record<'operationId' | 'operationRef', unknown>>;
export type Callback = Record<string, unknown | PathItem>;

export type Components = 
	{ 
		schemas?: Record<string, Schema | Reference>;
		responses?: Record<string, Reference | Response>;
		parameters?: Record<string, Reference | Parameter>;
		examples?: Record<string, Reference | Example>;
		requestBodies?: Record<string, Reference | RequestBody>;
		headers?: Record<string, Reference | Header>;
		securitySchemes?: Record<string, Reference | SecurityScheme>;
		links?: Record<string, Reference | Link>;
		callbacks?: Record<string, Reference | Callback>
	 } &
	Record<string, unknown>
;

export type Schema = 
	{ 
		title?: string;
		/**
		* @minimum `0`
		* @exclusiveMinimum `true`
		*/
		multipleOf?: number;
		maximum?: number;
		/**
		* @default `false`
		*/
		exclusiveMaximum?: boolean;
		minimum?: number;
		/**
		* @default `false`
		*/
		exclusiveMinimum?: boolean;

		/**
		* @minimum `0`
		*/
		maxLength?: number;

		/**
		* @minimum `0`
		* @default `0`
		*/
		minLength?: number;

		/**
		* @format `regex`
		*/
		pattern?: string;

		/**
		* @minimum `0`
		*/
		maxItems?: number;

		/**
		* @minimum `0`
		* @default `0`
		*/
		minItems?: number;

		/**
		* @default `false`
		*/
		uniqueItems?: boolean;

		/**
		* @minimum `0`
		*/
		maxProperties?: number;

		/**
		* @minimum `0`
		* @default `0`
		*/
		minProperties?: number;

		/**
		* @minItems `1`
		* @uniqueItems
		*/
		required?: string[];

		/**
		* @minItems `1`
		*/
		enum?: unknown[];

		type?: 
			'array' |
			'boolean' |
			'integer' |
			'number' |
			'object' |
			'string'
		;
		not?: Schema | Reference;
		allOf?: (Schema | Reference)[];
		oneOf?: (Schema | Reference)[];
		anyOf?: (Schema | Reference)[];
		items?: Schema | Reference;
		properties?: Record<string, Schema | Reference>;
		/**
		* @default `true`
		*/
		additionalProperties?: Schema | Reference | boolean;
		description?: string;
		format?: string;
		default?: unknown;
		/**
		* @default `false`
		*/
		nullable?: boolean;
		discriminator?: Discriminator;
		/**
		* @default `false`
		*/
		readOnly?: boolean;

		/**
		* @default `false`
		*/
		writeOnly?: boolean;
		example?: unknown;
		externalDocs?: ExternalDocumentation;
		/**
		* @default `false`
		*/
		deprecated?: boolean;
		xml?: XML
	 } &
	Record<string, unknown>
;

export interface Discriminator { propertyName: string; mapping?: Record<string, string> }

export type XML = 
	{ 
		name?: string;
		/**
		* @format `uri`
		*/
		namespace?: string;
		prefix?: string;
		/**
		* @default `false`
		*/
		attribute?: boolean;

		/**
		* @default `false`
		*/
		wrapped?: boolean
	 } &
	Record<string, unknown>
;

export type Example = 
	{ 
		summary?: string;
		description?: string;
		value?: unknown;
		/**
		* @format `uri-reference`
		*/
		externalValue?: string
	 } &
	Record<string, unknown>
;

export type SecurityScheme = 
	APIKeySecurityScheme |
	HTTPSecurityScheme |
	OAuth2SecurityScheme |
	OpenIdConnectSecurityScheme
;

export type APIKeySecurityScheme = 
	{ 
		type: 'apiKey';
		name: string;
		in: 'header' | 'query' | 'cookie';
		description?: string
	 } &
	Record<string, unknown>
;

export type HTTPSecurityScheme = 
	/**
	* Bearer
	*/
	{ scheme?: 'bearer' } |

	/**
	* Non Bearer
	*/
	Exclude<unknown, Record<'bearerFormat', unknown>>
;

export type OAuth2SecurityScheme = 
	{ type: 'oauth2'; flows: OAuthFlows; description?: string } &
	Record<string, unknown>
;

export type OAuthFlows = 
	{ 
		implicit?: ImplicitOAuthFlow;
		password?: PasswordOAuthFlow;
		clientCredentials?: ClientCredentialsFlow;
		authorizationCode?: AuthorizationCodeOAuthFlow
	 } &
	Record<string, unknown>
;

export type ImplicitOAuthFlow = 
	{ 
		/**
		* @format `uri-reference`
		*/
		authorizationUrl: string;

		/**
		* @format `uri-reference`
		*/
		refreshUrl?: string;
		scopes: Record<string, string>
	 } &
	Record<string, unknown>
;

export type PasswordOAuthFlow = 
	{ 
		/**
		* @format `uri-reference`
		*/
		tokenUrl: string;

		/**
		* @format `uri-reference`
		*/
		refreshUrl?: string;
		scopes?: Record<string, string>
	 } &
	Record<string, unknown>
;

export type ClientCredentialsFlow = 
	{ 
		/**
		* @format `uri-reference`
		*/
		tokenUrl: string;

		/**
		* @format `uri-reference`
		*/
		refreshUrl?: string;
		scopes?: Record<string, string>
	 } &
	Record<string, unknown>
;

export type AuthorizationCodeOAuthFlow = 
	{ 
		/**
		* @format `uri-reference`
		*/
		authorizationUrl: string;

		/**
		* @format `uri-reference`
		*/
		tokenUrl: string;

		/**
		* @format `uri-reference`
		*/
		refreshUrl?: string;
		scopes?: Record<string, string>
	 } &
	Record<string, unknown>
;

export type OpenIdConnectSecurityScheme = 
	{ 
		type: 'openIdConnect';
		/**
		* @format `uri-reference`
		*/
		openIdConnectUrl: string;
		description?: string
	 } &
	Record<string, unknown>
;