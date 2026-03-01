/**
* The platform API empowers developers to automate, extend and combine Heroku with other services.
*/
export interface RealWorldHeroku {
	'account-feature'?: HerokuPlatformAPIAccountFeature;
	account?: HerokuPlatformAPIAccount;
	'add-on-action'?: HerokuPlatformAPIAddOnAction;
	'add-on-attachment'?: HerokuPlatformAPIAddOnAttachment;
	'add-on-config'?: HerokuPlatformAPIAddOnConfig;
	'add-on-plan-action'?: HerokuPlatformAPIAddOnPlanAction;
	'add-on-region-capability'?: HerokuPlatformAPIAddOnRegionCapability;
	'add-on-service'?: HerokuPlatformAPIAddOnService;
	'add-on'?: HerokuPlatformAPIAddOn;
	'app-feature'?: HerokuPlatformAPIAppFeature;
	'app-formation-set'?: HerokuPlatformAPIApplicationFormationSet;
	'app-setup'?: HerokuSetupAPIAppSetup;
	'app-transfer'?: HerokuPlatformAPIAppTransfer;
	app?: HerokuPlatformAPIApp;
	'build-result'?: HerokuBuildAPIBuildResult;
	build?: HerokuBuildAPIBuild;
	'buildpack-installation'?: HerokuPlatformAPIBuildpackInstallations;
	collaborator?: HerokuPlatformAPICollaborator;
	'config-var'?: HerokuPlatformAPIConfigVars;
	credit?: HerokuPlatformAPICredit;
	domain?: HerokuPlatformAPIDomain;
	'dyno-size'?: HerokuPlatformAPIDynoSize;
	dyno?: HerokuPlatformAPIDyno;
	event?: HerokuPlatformAPIEvent;
	'failed-event'?: HerokuPlatformAPIFailedEvent;
	'filter-apps'?: HerokuPlatformAPIFilters;
	formation?: HerokuPlatformAPIFormation;
	'identity-provider'?: HerokuPlatformAPIIdentityProvider;
	'inbound-ruleset'?: HerokuPlatformAPIInboundRuleset;
	invitation?: HerokuPlatformAPIInvitation;
	'invoice-address'?: HerokuVaultAPIInvoiceAddress;
	invoice?: HerokuPlatformAPIInvoice;
	key?: HerokuPlatformAPIKey;
	'log-drain'?: HerokuPlatformAPILogDrain;
	'log-session'?: HerokuPlatformAPILogSession;
	'oauth-authorization'?: HerokuPlatformAPIOAuthAuthorization;
	'oauth-client'?: HerokuPlatformAPIOAuthClient;
	'oauth-grant'?: HerokuPlatformAPIOAuthGrant;
	'oauth-token'?: HerokuPlatformAPIOAuthToken;
	'organization-add-on'?: HerokuPlatformAPIOrganizationAddOn;
	'organization-app-collaborator'?: HerokuPlatformAPIOrganizationAppCollaborator;
	'organization-app'?: HerokuPlatformAPIOrganizationApp;
	'organization-feature'?: HerokuPlatformAPIOrganizationFeature;
	'organization-invitation'?: HerokuPlatformAPIOrganizationInvitation;
	'organization-invoice'?: HerokuPlatformAPIOrganizationInvoice;
	'organization-member'?: HerokuPlatformAPIOrganizationMember;
	'organization-preferences'?: HerokuPlatformAPIOrganizationPreferences;
	organization?: HerokuPlatformAPIOrganization;
	'outbound-ruleset'?: HerokuPlatformAPIOutboundRuleset;
	'password-reset'?: HerokuPlatformAPIPasswordReset;
	'organization-app-permission'?: HerokuPlatformAPIOrganizationAppPermission;
	'pipeline-coupling'?: HerokuPlatformAPIPipelineCoupling;
	'pipeline-promotion-target'?: HerokuPlatformAPIPipelinePromotionTarget;
	'pipeline-promotion'?: HerokuPlatformAPIPipelinePromotion;
	pipeline?: HerokuPlatformAPIPipeline;
	plan?: HerokuPlatformAPIPlan;
	'rate-limit'?: HerokuPlatformAPIRateLimit;
	region?: HerokuPlatformAPIRegion;
	release?: HerokuPlatformAPIRelease;
	slug?: HerokuPlatformAPISlug;
	'sms-number'?: HerokuPlatformAPISMSNumber;
	'sni-endpoint'?: HerokuPlatformAPISNIEndpoint;
	source?: HerokuPlatformAPISource;
	'space-app-access'?: HerokuPlatformAPISpaceAccess;
	'space-nat'?: HerokuPlatformAPISpaceNetworkAddressTranslation;
	space?: HerokuPlatformAPISpace;
	'ssl-endpoint'?: HerokuPlatformAPISSLEndpoint;
	stack?: HerokuPlatformAPIStack;
	'user-preferences'?: HerokuPlatformAPIUserPreferences;
	'whitelisted-add-on-service'?: HerokuPlatformAPIWhitelistedEntity
}

/**
* An account feature represents a Heroku labs capability that can be enabled or disabled for an account on Heroku.
*/
export interface HerokuPlatformAPIAccountFeature { enabled?: Enabled }

/**
* whether or not account feature has been enabled
*/
export type Enabled = boolean;

/**
* An account represents an individual signed up to use the Heroku platform.
*/
export interface HerokuPlatformAPIAccount {
	allow_tracking?: AllowTracking;
	beta?: Beta;
	email?: Email;
	/**
	* Identity Provider details for federated users.
	*/
	identity_provider?: { organization?: {  } } | null;
	name?: Name;
	/**
	* organization selected by default
	*/
	default_organization?: {  } | null
}

/**
* whether to allow third party web activity tracking
* @default `true`
*/
export type AllowTracking = boolean;

/**
* whether allowed to utilize beta Heroku features
* @default `false`
*/
export type Beta = boolean;

/**
* unique email address of account
* @format `email`
*/
export type Email = string;

/**
* full name of the account owner
*/
export type Name = string | null;

/**
* Add-on Actions are lifecycle operations for add-on provisioning and deprovisioning. They allow whitelisted add-on providers to (de)provision add-ons in the background and then report back when (de)provisioning is complete.
*/
export interface HerokuPlatformAPIAddOnAction {}

/**
* An add-on attachment represents a connection between an app and an add-on that it has been given access to.
*/
export interface HerokuPlatformAPIAddOnAttachment {
	/**
	* identity of add-on
	*/
	addon?: { 
		/**
		* billing application associated with this add-on
		*/
		app: { name?: Name1 };

		/**
		* identity of add-on plan
		*/
		plan?: {  }
	 };

	/**
	* application that is attached to add-on
	*/
	app?: { name?: Name1 }
}

/**
* unique name of app
* @pattern `^[a-z][a-z0-9-]{2,29}$`
*/
export type Name1 = string;

/**
* Configuration of an Add-on
*/
export interface HerokuPlatformAPIAddOnConfig { name?: Name2; value?: Value }

/**
* unique name of the config
*/
export type Name2 = string;

/**
* value of the config
*/
export type Value = string | null;

/**
* Add-on Plan Actions are Provider functionality for specific add-on installations
*/
export interface HerokuPlatformAPIAddOnPlanAction {}

/**
* Add-on region capabilities represent the relationship between an Add-on Service and a specific Region. Only Beta and GA add-ons are returned by these endpoints.
*/
export interface HerokuPlatformAPIAddOnRegionCapability {
	addon_service?: HerokuPlatformAPIAddOnService;
	region?: HerokuPlatformAPIRegion
}

/**
* Add-on services represent add-ons that may be provisioned for apps. Endpoints under add-on services can be accessed without authentication.
*/
export interface HerokuPlatformAPIAddOnService {}

/**
* A region represents a geographic location in which your application may run.
*/
export interface HerokuPlatformAPIRegion {}

/**
* Add-ons represent add-ons that have been provisioned and attached to one or more apps.
*/
export interface HerokuPlatformAPIAddOn {
	/**
	* identity of add-on service
	*/
	addon_service?: {  };

	/**
	* billing application associated with this add-on
	*/
	app?: { name?: Name1 };

	/**
	* identity of add-on plan
	*/
	plan?: {  }
}

/**
* An app feature represents a Heroku labs capability that can be enabled or disabled for an app on Heroku.
*/
export interface HerokuPlatformAPIAppFeature { enabled?: Enabled1 }

/**
* whether or not app feature has been enabled
*/
export type Enabled1 = boolean;

/**
* App formation set describes the combination of process types with their quantities and sizes as well as application process tier
*/
export interface HerokuPlatformAPIApplicationFormationSet {
	/**
	* app being described by the formation-set
	*/
	app?: { name?: Name1 }
}

/**
* An app setup represents an app on Heroku that is setup using an environment, addons, and scripts described in an app.json manifest file.
*/
export interface HerokuSetupAPIAppSetup {
	/**
	* identity of app
	*/
	app?: { name?: Name1 };

	/**
	* identity and status of build
	*/
	build?: null | {  }
}

/**
* An app transfer represents a two party interaction for transferring ownership of an app.
*/
export interface HerokuPlatformAPIAppTransfer {
	/**
	* app involved in the transfer
	*/
	app?: { name?: Name1 };

	/**
	* identity of the owner of the transfer
	*/
	owner?: { email?: Email };

	/**
	* identity of the recipient of the transfer
	*/
	recipient?: { email?: Email }
}

/**
* An app represents the program that you would like to deploy and run on Heroku.
*/
export interface HerokuPlatformAPIApp {
	/**
	* identity of the stack that will be used for new builds
	*/
	build_stack?: {  };
	maintenance?: Maintenance;
	name?: Name1;
	/**
	* identity of app owner
	*/
	owner?: { email?: Email };

	/**
	* identity of organization
	*/
	organization?: null | {  };

	/**
	* identity of app region
	*/
	region?: {  };

	/**
	* identity of space
	*/
	space?: null | { name?: Name3 };

	/**
	* identity of app stack
	*/
	stack?: {  }
}

/**
* maintenance status of app
* @default `false`
*/
export type Maintenance = boolean;

/**
* unique name of space
* @pattern `^[a-z0-9](?:[a-z0-9]|-(?!-))+[a-z0-9]$`
*/
export type Name3 = string;

/**
* A build result contains the output from a build.
*/
export interface HerokuBuildAPIBuildResult {
	/**
	* identity of build
	*/
	build?: {  };

	/**
	* A list of all the lines of a build's output. This has been replaced by the `output_stream_url` attribute on the build resource.
	*/
	lines?: Line[]
}

/**
* a single line of output to STDOUT or STDERR from the build.
*/
export interface Line {}

/**
* A build represents the process of transforming a code tarball into a slug
*/
export interface HerokuBuildAPIBuild {
	/**
	* app that the build belongs to
	*/
	app?: {  };
	buildpacks?: Buildpacks;
	source_blob?: SourceBlob;
	/**
	* slug created by this build
	*/
	slug?: {  } | null;

	/**
	* user that started the build
	*/
	user?: { email?: Email }
}

/**
* buildpacks executed for this build, in order
*/
export type Buildpacks = 
	/**
	* Buildpack to execute in a build
	*/
	{ url?: Url }[] |
	null
;

/**
* location of the buildpack for the app. Either a url (unofficial buildpacks) or an internal urn (heroku official buildpacks).
*/
export type Url = string;

/**
* location of gzipped tarball of source code used to create build
*/
export interface SourceBlob {}

/**
* A buildpack installation represents a buildpack that will be run against an app.
*/
export interface HerokuPlatformAPIBuildpackInstallations {
	/**
	* buildpack
	*/
	buildpack?: { url?: Url; name?: Name4 }
}

/**
* either the shorthand name (heroku official buildpacks) or url (unofficial buildpacks) of the buildpack for the app
*/
export type Name4 = string;

/**
* A collaborator represents an account that has been given access to an app on Heroku.
*/
export interface HerokuPlatformAPICollaborator {
	/**
	* app collaborator belongs to
	*/
	app: { name?: Name1 };
	permissions?: HerokuPlatformAPIOrganizationAppPermission[];
	/**
	* identity of collaborated account
	*/
	user: { email?: Email }
}

/**
* An organization app permission is a behavior that is assigned to a user in an organization app.
*/
export interface HerokuPlatformAPIOrganizationAppPermission {}

/**
* Config Vars allow you to manage the configuration information provided to an app on Heroku.
*/
export type HerokuPlatformAPIConfigVars = Record<string, string>;

/**
* A credit represents value that will be used up before further charges are assigned to an account.
*/
export interface HerokuPlatformAPICredit {
	amount?: Amount;
	balance?: Balance;
	created_at?: CreatedAt;
	expires_at?: ExpiresAt;
	id?: Id;
	title?: Title;
	updated_at?: UpdatedAt
}

/**
* total value of credit in cents
*/
export type Amount = number;

/**
* remaining value of credit in cents
*/
export type Balance = number;

/**
* when credit was created
* @format `date-time`
*/
export type CreatedAt = string;

/**
* when credit will expire
* @format `date-time`
*/
export type ExpiresAt = string;

/**
* unique identifier of credit
* @format `uuid`
*/
export type Id = string;

/**
* a name for credit
*/
export type Title = string;

/**
* when credit was updated
* @format `date-time`
*/
export type UpdatedAt = string;

/**
* Domains define what web routes should be routed to an app on Heroku.
*/
export interface HerokuPlatformAPIDomain {
	/**
	* app that owns the domain
	*/
	app?: { name?: Name1 }
}

/**
* Dyno sizes are the values and details of sizes that can be assigned to dynos. This information can also be found at : [https://devcenter.heroku.com/articles/dyno-types](https://devcenter.heroku.com/articles/dyno-types).
*/
export interface HerokuPlatformAPIDynoSize {}

/**
* Dynos encapsulate running processes of an app on Heroku. Detailed information about dyno sizes can be found at: [https://devcenter.heroku.com/articles/dyno-types](https://devcenter.heroku.com/articles/dyno-types).
*/
export interface HerokuPlatformAPIDyno {
	command?: Command;
	/**
	* app release of the dyno
	*/
	release?: {  };

	/**
	* app formation belongs to
	*/
	app?: { name?: Name1 };
	size?: Size;
	type?: Type
}

/**
* command used to start this process
*/
export type Command = string;

/**
* dyno size (default: "standard-1X")
*/
export type Size = string;

/**
* type of process
*/
export type Type = string;

/**
* An event represents an action performed on another API resource.
*/
export interface HerokuPlatformAPIEvent {
	/**
	* user that performed the operation
	*/
	actor?: { email?: Email };

	/**
	* data fields that were changed during update with previous values
	*/
	previous_data?: {  }
}

/**
* A failed event represents a failure of an action performed on another API resource.
*/
export interface HerokuPlatformAPIFailedEvent {
	/**
	* The related resource of the failed action.
	*/
	resource?: {  } | null
}

/**
* Filters are special endpoints to allow for API consumers to specify a subset of resources to consume in order to reduce the number of requests that are performed.  Each filter endpoint endpoint is responsible for determining its supported request format.  The endpoints are over POST in order to handle large request bodies without hitting request uri query length limitations, but the requests themselves are idempotent and will not have side effects.
*/
export interface HerokuPlatformAPIFilters {}

/**
* The formation of processes that should be maintained for an app. Update the formation to scale processes or change dyno sizes. Available process type names and commands are defined by the `process_types` attribute for the [slug](#slug) currently released on an app.
*/
export interface HerokuPlatformAPIFormation {
	/**
	* app formation belongs to
	*/
	app?: { name?: Name1 };
	command?: Command1;
	quantity?: Quantity;
	size?: Size1
}

/**
* command to use to launch this process
*/
export type Command1 = string;

/**
* number of processes to maintain
*/
export type Quantity = number;

/**
* dyno size (default: "standard-1X")
*/
export type Size1 = string;

/**
* Identity Providers represent the SAML configuration of an Organization.
*/
export interface HerokuPlatformAPIIdentityProvider {
	certificate?: Certificate;
	entity_id?: EntityId;
	slo_target_url?: SloTargetUrl;
	sso_target_url?: SsoTargetUrl;
	/**
	* organization associated with this identity provider
	*/
	organization?: null | {  }
}

/**
* raw contents of the public certificate (eg: .crt or .pem file)
*/
export type Certificate = string;

/**
* URL identifier provided by the identity provider
*/
export type EntityId = string;

/**
* single log out URL for this identity provider
*/
export type SloTargetUrl = string;

/**
* single sign on URL for this identity provider
*/
export type SsoTargetUrl = string;

/**
* An inbound-ruleset is a collection of rules that specify what hosts can or cannot connect to an application.
*/
export interface HerokuPlatformAPIInboundRuleset { rules?: Rule[]; created_by?: Email }

/**
* the combination of an IP address in CIDR notation and whether to allow or deny it's traffic.
*/
export interface Rule { action: Action; source: Source }

/**
* states whether the connection is allowed or denied
*/
export type Action = 'allow' | 'deny';

/**
* is the request’s source in CIDR notation
* @pattern `^(([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])\.){3}([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])(\/([0-9]|[1-2][0-9]|3[0-2]))$`
*/
export type Source = string;

/**
* An invitation represents an invite sent to a user to use the Heroku platform.
*/
export interface HerokuPlatformAPIInvitation { user?: { email?: Email } }

/**
* An invoice address represents the address that should be listed on an invoice.
*/
export interface HerokuVaultAPIInvoiceAddress {
	address_1?: Address1;
	address_2?: Address2;
	city?: City;
	country?: Country;
	heroku_id?: Identity;
	other?: Other;
	postal_code?: PostalCode;
	state?: State;
	use_invoice_address?: UseInvoiceAddress
}

/**
* invoice street address line 1
*/
export type Address1 = string;

/**
* invoice street address line 2
*/
export type Address2 = string;

/**
* invoice city
*/
export type City = string;

/**
* country
*/
export type Country = string;

export type Identity = HerokuId;

/**
* heroku_id identifier reference
*/
export type HerokuId = string;

/**
* metadata / additional information to go on invoice
*/
export type Other = string;

/**
* invoice zip code
*/
export type PostalCode = string;

/**
* invoice state
*/
export type State = string;

/**
* flag to use the invoice address for an account or not
* @default `false`
*/
export type UseInvoiceAddress = boolean;

/**
* An invoice is an itemized bill of goods for an account which includes pricing and charges.
*/
export interface HerokuPlatformAPIInvoice {}

/**
* Keys represent public SSH keys associated with an account and are used to authorize accounts as they are performing git operations.
*/
export interface HerokuPlatformAPIKey {}

/**
* [Log drains](https://devcenter.heroku.com/articles/log-drains) provide a way to forward your Heroku logs to an external syslog server for long-term archiving. This external service must be configured to receive syslog packets from Heroku, whereupon its URL can be added to an app using this API. Some add-ons will add a log drain when they are provisioned to an app. These drains can only be removed by removing the add-on.
*/
export interface HerokuPlatformAPILogDrain {}

/**
* A log session is a reference to the http based log stream for an app.
*/
export interface HerokuPlatformAPILogSession {}

/**
* OAuth authorizations represent clients that a Heroku user has authorized to automate, customize or extend their usage of the platform. For more information please refer to the [Heroku OAuth documentation](https://devcenter.heroku.com/articles/oauth)
*/
export interface HerokuPlatformAPIOAuthAuthorization {
	/**
	* access token for this authorization
	*/
	access_token?: null | {  };

	/**
	* identifier of the client that obtained this authorization, if any
	*/
	client?: null | {  };

	/**
	* this authorization's grant
	*/
	grant?: null | {  };

	/**
	* refresh token for this authorization
	*/
	refresh_token?: null | {  };

	/**
	* authenticated user associated with this authorization
	*/
	user?: { email?: Email; full_name?: Name }
}

/**
* OAuth clients are applications that Heroku users can authorize to automate, customize or extend their usage of the platform. For more information please refer to the [Heroku OAuth documentation](https://devcenter.heroku.com/articles/oauth).
*/
export interface HerokuPlatformAPIOAuthClient {}

/**
* OAuth grants are used to obtain authorizations on behalf of a user. For more information please refer to the [Heroku OAuth documentation](https://devcenter.heroku.com/articles/oauth)
*/
export interface HerokuPlatformAPIOAuthGrant {}

/**
* OAuth tokens provide access for authorized clients to act on behalf of a Heroku user to automate, customize or extend their usage of the platform. For more information please refer to the [Heroku OAuth documentation](https://devcenter.heroku.com/articles/oauth)
*/
export interface HerokuPlatformAPIOAuthToken {
	/**
	* current access token
	*/
	access_token?: {  };

	/**
	* authorization for this set of tokens
	*/
	authorization?: {  };

	/**
	* OAuth client secret used to obtain token
	*/
	client?: null | {  };

	/**
	* grant used on the underlying authorization
	*/
	grant?: { type?: Type1 };

	/**
	* refresh token for this authorization
	*/
	refresh_token?: {  };

	/**
	* OAuth session using this token
	*/
	session?: {  };

	/**
	* Reference to the user associated with this token
	*/
	user?: {  }
}

/**
* type of grant requested, one of `authorization_code` or `refresh_token`
*/
export type Type1 = string;

/**
* A list of add-ons the Organization uses across all apps
*/
export interface HerokuPlatformAPIOrganizationAddOn {}

/**
* An organization collaborator represents an account that has been given access to an organization app on Heroku.
*/
export interface HerokuPlatformAPIOrganizationAppCollaborator {
	/**
	* app collaborator belongs to
	*/
	app?: { name?: Name1 };

	/**
	* identity of collaborated account
	*/
	user?: { email?: Email }
}

/**
* An organization app encapsulates the organization specific functionality of Heroku apps.
*/
export interface HerokuPlatformAPIOrganizationApp {
	joined?: Joined;
	locked?: Locked;
	maintenance?: Maintenance;
	name?: Name1;
	/**
	* organization that owns this app
	*/
	organization?: null | {  };

	/**
	* identity of app owner
	*/
	owner?: null | { email?: Email };

	/**
	* identity of app region
	*/
	region?: {  };

	/**
	* identity of space
	*/
	space?: null | { name?: Name3 };

	/**
	* identity of app stack
	*/
	stack?: {  }
}

/**
* is the current member a collaborator on this app.
* @default `false`
*/
export type Joined = boolean;

/**
* are other organization members forbidden from joining this app.
* @default `false`
*/
export type Locked = boolean;

/**
* An organization feature represents a feature enabled on an organization account.
*/
export interface HerokuPlatformAPIOrganizationFeature { enabled?: Enabled2 }

/**
* whether or not organization feature has been enabled
*/
export type Enabled2 = boolean;

/**
* An organization invitation represents an invite to an organization.
*/
export interface HerokuPlatformAPIOrganizationInvitation {
	invited_by?: { email?: Email; name?: Name };
	organization?: {  };
	user?: { email?: Email; name?: Name }
}

/**
* An organization invoice is an itemized bill of goods for an organization which includes pricing and charges.
*/
export interface HerokuPlatformAPIOrganizationInvoice {}

/**
* An organization member is an individual with access to an organization.
*/
export interface HerokuPlatformAPIOrganizationMember {
	/**
	* user information for the membership
	*/
	user?: { email?: Email; name?: Name }
}

/**
* Tracks an organization's preferences
*/
export interface HerokuPlatformAPIOrganizationPreferences {
	'default-permission'?: DefaultPermission;
	'whitelisting-enabled'?: WhitelistingEnabled
}

/**
* The default permission used when adding new members to the organization
*/
export type DefaultPermission = 'admin' | 'member' | 'viewer' | null;

/**
* Whether whitelisting rules should be applied to add-on installations
*/
export type WhitelistingEnabled = boolean | null;

/**
* Organizations allow you to manage access to a shared group of applications across your development team.
*/
export interface HerokuPlatformAPIOrganization { default?: Default }

/**
* whether to use this organization when none is specified
*/
export type Default = boolean;

/**
* An outbound-ruleset is a collection of rules that specify what hosts Dynos are allowed to communicate with.
*/
export interface HerokuPlatformAPIOutboundRuleset { rules?: Rule1[]; created_by?: Email }

/**
* the combination of an IP address in CIDR notation, a from_port, to_port and protocol.
*/
export interface Rule1 {
	target: Target;
	from_port: Port;
	to_port: Port;
	protocol: Protocol
}

/**
* is the target destination in CIDR notation
* @pattern `^(([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])\.){3}([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])(\/([0-9]|[1-2][0-9]|3[0-2]))$`
*/
export type Target = string;

/**
* an endpoint of communication in an operating system.
*/
export type Port = number;

/**
* formal standards and policies comprised of rules, procedures and formats that define communication between two or more devices over a network
*/
export type Protocol = string;

/**
* A password reset represents a in-process password reset attempt.
*/
export interface HerokuPlatformAPIPasswordReset { user?: { email?: Email } }

/**
* Information about an app's coupling to a pipeline
*/
export interface HerokuPlatformAPIPipelineCoupling {
	/**
	* app involved in the pipeline coupling
	*/
	app?: {  };

	/**
	* pipeline involved in the coupling
	*/
	pipeline?: {  };
	stage?: Stage
}

/**
* target pipeline stage
*/
export type Stage = 'test' | 'review' | 'development' | 'staging' | 'production';

/**
* Promotion targets represent an individual app being promoted to
*/
export interface HerokuPlatformAPIPipelinePromotionTarget {
	/**
	* the app which was promoted to
	*/
	app?: {  };
	error_message?: ErrorMessage;
	/**
	* the promotion which the target belongs to
	*/
	pipeline_promotion?: {  };

	/**
	* the release which was created on the target app
	*/
	release?: {  } | null
}

/**
* an error message for why the promotion failed
*/
export type ErrorMessage = null | string;

/**
* Promotions allow you to move code from an app in a pipeline to all targets
*/
export interface HerokuPlatformAPIPipelinePromotion {
	created_at?: CreatedAt1;
	/**
	* the pipeline which the promotion belongs to
	*/
	pipeline?: {  };

	/**
	* the app being promoted from
	*/
	source?: { 
		/**
		* the app which was promoted from
		*/
		app?: {  };

		/**
		* the release used to promoted from
		*/
		release?: {  }
	 };
	updated_at?: UpdatedAt1
}

/**
* when promotion was created
* @format `date-time`
*/
export type CreatedAt1 = string;

/**
* when promotion was updated
* @format `date-time`
*/
export type UpdatedAt1 = string | null;

/**
* A pipeline allows grouping of apps into different stages.
*/
export interface HerokuPlatformAPIPipeline { name?: Name5 }

/**
* name of pipeline
* @pattern `^[a-z][a-z0-9-]{2,29}$`
*/
export type Name5 = string;

/**
* Plans represent different configurations of add-ons that may be added to apps. Endpoints under add-on services can be accessed without authentication.
*/
export interface HerokuPlatformAPIPlan {
	/**
	* identity of add-on service
	*/
	addon_service?: {  };
	compliance?: Compliance;
	/**
	* price
	*/
	price?: {  }
}

/**
* the compliance regimes applied to an add-on plan
*/
export type Compliance = null | Regime[];

/**
* compliance requirements an add-on plan must adhere to
*/
export type Regime = 'HIPAA' | 'PCI';

/**
* Rate Limit represents the number of request tokens each account holds. Requests to this endpoint do not count towards the rate limit.
*/
export interface HerokuPlatformAPIRateLimit {}

/**
* A release represents a combination of code, config vars and add-ons for an app on Heroku.
*/
export interface HerokuPlatformAPIRelease {
	/**
	* add-on plans installed on the app for this release
	*/
	addon_plan_names?: Name6[];

	/**
	* app involved in the release
	*/
	app?: { name?: Name1 };

	/**
	* slug running in this release
	*/
	slug?: {  } | null;

	/**
	* user that created the release
	*/
	user?: { email?: Email }
}

/**
* unique name of this plan
*/
export type Name6 = string;

/**
* A slug is a snapshot of your application code that is ready to run on the platform.
*/
export interface HerokuPlatformAPISlug {
	/**
	* pointer to the url where clients can fetch or store the actual release binary
	*/
	blob?: {  };
	buildpack_provided_description?: BuildpackProvidedDescription;
	commit?: Commit;
	commit_description?: CommitDescription;
	process_types?: ProcessTypes;
	/**
	* identity of slug stack
	*/
	stack?: {  }
}

/**
* description from buildpack of slug
*/
export type BuildpackProvidedDescription = null | string;

/**
* identification of the code with your version control system (eg: SHA of the git HEAD)
*/
export type Commit = null | string;

/**
* an optional description of the provided commit
*/
export type CommitDescription = null | string;

/**
* hash mapping process type names to their respective command
*/
export type ProcessTypes = Record<string, string>;

/**
* SMS numbers are used for recovery on accounts with two-factor authentication enabled.
*/
export interface HerokuPlatformAPISMSNumber {}

/**
* SNI Endpoint is a public address serving a custom SSL cert for HTTPS traffic, using the SNI TLS extension, to a Heroku app.
*/
export interface HerokuPlatformAPISNIEndpoint { certificate_chain?: CertificateChain; cname?: Cname }

/**
* raw contents of the public certificate chain (eg: .crt or .pem file)
*/
export type CertificateChain = string;

/**
* deprecated; refer to GET /apps/:id/domains for valid CNAMEs for this app
*/
export type Cname = string;

/**
* A source is a location for uploading and downloading an application's source code.
*/
export interface HerokuPlatformAPISource {
	/**
	* pointer to the URL where clients can fetch or store the source
	*/
	source_blob?: {  }
}

/**
* Space access represents the permissions a particular user has on a particular space.
*/
export interface HerokuPlatformAPISpaceAccess {
	/**
	* space user belongs to
	*/
	space?: { name?: Name1 };

	/**
	* user space permissions
	*/
	permissions?: { description?: string; name?: string }[];

	/**
	* identity of user account
	*/
	user?: { email?: Email }
}

/**
* Network address translation (NAT) for stable outbound IP addresses from a space
*/
export interface HerokuPlatformAPISpaceNetworkAddressTranslation {}

/**
* A space is an isolated, highly available, secure app execution environments, running in the modern VPC substrate.
*/
export interface HerokuPlatformAPISpace {
	name?: Name3;
	/**
	* organization that owns this space
	*/
	organization?: {  };

	/**
	* identity of space region
	*/
	region?: {  }
}

/**
* [SSL Endpoint](https://devcenter.heroku.com/articles/ssl-endpoint) is a public address serving custom SSL cert for HTTPS traffic to a Heroku app. Note that an app must have the `ssl:endpoint` add-on installed before it can provision an SSL Endpoint using these APIs.
*/
export interface HerokuPlatformAPISSLEndpoint {
	/**
	* application associated with this ssl-endpoint
	*/
	app?: { name?: Name1 };
	certificate_chain?: CertificateChain1;
	cname?: Cname1
}

/**
* raw contents of the public certificate chain (eg: .crt or .pem file)
*/
export type CertificateChain1 = string;

/**
* canonical name record, the address to point a domain at
*/
export type Cname1 = string;

/**
* Stacks are the different application execution environments available in the Heroku platform.
*/
export interface HerokuPlatformAPIStack {}

/**
* Tracks a user's preferences and message dismissals
*/
export interface HerokuPlatformAPIUserPreferences {
	timezone?: Timezone;
	'default-organization'?: DefaultOrganization;
	'dismissed-github-banner'?: DismissedGithubBanner;
	'dismissed-getting-started'?: DismissedGettingStarted;
	'dismissed-org-access-controls'?: DismissedOrgAccessControls;
	'dismissed-org-wizard-notification'?: DismissedOrgWizardNotification;
	'dismissed-pipelines-banner'?: DismissedPipelinesBanner;
	'dismissed-pipelines-github-banner'?: DismissedPipelinesGithubBanner;
	'dismissed-pipelines-github-banners'?: DismissedPipelinesGithubBanners;
	'dismissed-sms-banner'?: DismissedSmsBanner
}

/**
* User's default timezone
*/
export type Timezone = string | null;

/**
* User's default organization
*/
export type DefaultOrganization = string | null;

/**
* Whether the user has dismissed the GitHub link banner
*/
export type DismissedGithubBanner = boolean | null;

/**
* Whether the user has dismissed the getting started banner
*/
export type DismissedGettingStarted = boolean | null;

/**
* Whether the user has dismissed the Organization Access Controls banner
*/
export type DismissedOrgAccessControls = boolean | null;

/**
* Whether the user has dismissed the Organization Wizard
*/
export type DismissedOrgWizardNotification = boolean | null;

/**
* Whether the user has dismissed the Pipelines banner
*/
export type DismissedPipelinesBanner = boolean | null;

/**
* Whether the user has dismissed the GitHub banner on a pipeline overview
*/
export type DismissedPipelinesGithubBanner = boolean | null;

/**
* Which pipeline uuids the user has dismissed the GitHub banner for
*/
export type DismissedPipelinesGithubBanners = null | Id1[];

/**
* unique identifier of pipeline
* @format `uuid`
*/
export type Id1 = string;

/**
* Whether the user has dismissed the 2FA SMS banner
*/
export type DismissedSmsBanner = boolean | null;

/**
* Entities that have been whitelisted to be used by an Organization
*/
export interface HerokuPlatformAPIWhitelistedEntity {}