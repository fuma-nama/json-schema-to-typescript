export type Info = 
	{ 
		title: string;
		description?: string;
		termsOfService?: string;
		contact?: Contact;
		license?: License;
		version: string
	 } &
	Record<string, unknown>
;

export type Contact = 
	{ name?: string; url?: string; email?: string } &
	Record<string, unknown>
;

export type License = { name: string; url?: string } & Record<string, unknown>;

export type ExternalDocumentation = 
	{ description?: string; url: string } &
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
		style?: 'matrix' | 'label' | 'simple';
		required: true
	 } |

	/**
	* Parameter in query
	*/
	{ 
		in?: 'query';
		style?: 'form' | 'spaceDelimited' | 'pipeDelimited' | 'deepObject'
	 } |

	/**
	* Parameter in header
	*/
	{ in?: 'header'; style?: 'simple' } |

	/**
	* Parameter in cookie
	*/
	{ in?: 'cookie'; style?: 'form' }
;

export type Reference = Record<string, string>;

export type Operation = 
	{ 
		tags?: string[];
		summary?: string;
		description?: string;
		externalDocs?: ExternalDocumentation;
		operationId?: string;
		parameters?: (Parameter | Reference)[];
		requestBody?: RequestBody | Reference;
		responses: Responses;
		callbacks?: Record<string, Callback | Reference>;
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
		required?: boolean
	 } &
	Record<string, unknown>
;

export type MediaType = ExampleXORExamples;

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

export type Link = Exclude<unknown, /**
* Operation Id and Operation Ref are mutually exclusive
*/
Record<'operationId' | 'operationRef', unknown>>;

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
		multipleOf?: number;
		maximum?: number;
		exclusiveMaximum?: boolean;
		minimum?: number;
		exclusiveMinimum?: boolean;
		maxLength?: number;
		minLength?: number;
		pattern?: string;
		maxItems?: number;
		minItems?: number;
		uniqueItems?: boolean;
		maxProperties?: number;
		minProperties?: number;
		required?: string[];
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
		additionalProperties?: Schema | Reference | boolean;
		description?: string;
		format?: string;
		default?: unknown;
		nullable?: boolean;
		discriminator?: Discriminator;
		readOnly?: boolean;
		writeOnly?: boolean;
		example?: unknown;
		externalDocs?: ExternalDocumentation;
		deprecated?: boolean;
		xml?: XML
	 } &
	Record<string, unknown>
;

export interface Discriminator { propertyName: string; mapping?: Record<string, string> }

export type XML = 
	{ 
		name?: string;
		namespace?: string;
		prefix?: string;
		attribute?: boolean;
		wrapped?: boolean
	 } &
	Record<string, unknown>
;

export type Example = 
	{ 
		summary?: string;
		description?: string;
		value?: unknown;
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
		authorizationUrl: string;
		refreshUrl?: string;
		scopes: Record<string, string>
	 } &
	Record<string, unknown>
;

export type PasswordOAuthFlow = 
	{ 
		tokenUrl: string;
		refreshUrl?: string;
		scopes?: Record<string, string>
	 } &
	Record<string, unknown>
;

export type ClientCredentialsFlow = 
	{ 
		tokenUrl: string;
		refreshUrl?: string;
		scopes?: Record<string, string>
	 } &
	Record<string, unknown>
;

export type AuthorizationCodeOAuthFlow = 
	{ 
		authorizationUrl: string;
		tokenUrl: string;
		refreshUrl?: string;
		scopes?: Record<string, string>
	 } &
	Record<string, unknown>
;

export type OpenIdConnectSecurityScheme = 
	{ 
		type: 'openIdConnect';
		openIdConnectUrl: string;
		description?: string
	 } &
	Record<string, unknown>
;

/**
* Validation schema for OpenAPI Specification 3.0.X.
*/
export type RealWorldOpenapi = 
	{ 
		openapi: string;
		info: Info;
		externalDocs?: ExternalDocumentation;
		servers?: Server[];
		security?: SecurityRequirement[];
		tags?: Tag[];
		paths: Paths;
		components?: Components
	 } &
	Record<string, unknown>
;