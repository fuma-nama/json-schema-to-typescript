/*The platform API empowers developers to automate, extend and combine Heroku with other services.*/ export type RealWorldHeroku = { 
	/*An account feature represents a Heroku labs capability that can be enabled or disabled for an account on Heroku.*/ 'account-feature'?: { 
		/*when account feature was created*/ created_at?: string;
		/*description of account feature*/ description?: string;
		/*documentation URL of account feature*/ doc_url?: string;
		/*whether or not account feature has been enabled*/ enabled?: boolean;
		/*unique identifier of account feature*/ id?: string;
		/*unique name of account feature*/ name?: string;
		/*state of account feature*/ state?: string;
		/*when account feature was updated*/ updated_at?: string;
		/*user readable feature name*/ display_name?: string;
		/*e-mail to send feedback about the feature*/ feedback_email?: string
	 };
	/*An account represents an individual signed up to use the Heroku platform.*/ account?: HerokuPlatformAPIAccount;
	/*Add-on Actions are lifecycle operations for add-on provisioning and deprovisioning. They allow whitelisted add-on providers to (de)provision add-ons in the background and then report back when (de)provisioning is complete.*/ 'add-on-action'?: {  };
	/*An add-on attachment represents a connection between an app and an add-on that it has been given access to.*/ 'add-on-attachment'?: HerokuPlatformAPIAddOnAttachment;
	/*Configuration of an Add-on*/ 'add-on-config'?: { 
		/*unique name of the config*/ name?: string;
		/*value of the config*/ value?: 
			/*value of the config*/ string |
			/*value of the config*/ null
	 };

	/*Add-on Plan Actions are Provider functionality for specific add-on installations*/ 'add-on-plan-action'?: { 
		/*a unique identifier*/ id?: string;
		/*the display text shown in Dashboard*/ label?: string;
		/*identifier of the action to take that is sent via SSO*/ action?: string;
		/*absolute URL to use instead of an action*/ url?: string;
		/*if the action requires the user to own the app*/ requires_owner?: boolean
	 };

	/*Add-on region capabilities represent the relationship between an Add-on Service and a specific Region. Only Beta and GA add-ons are returned by these endpoints.*/ 'add-on-region-capability'?: { 
		/*unique identifier of this add-on-region-capability*/ id?: string;
		/*whether the add-on can be installed to a Space*/ supports_private_networking?: boolean;
		/*Add-on services represent add-ons that may be provisioned for apps. Endpoints under add-on services can be accessed without authentication.*/ addon_service?: HerokuPlatformAPIAddOnService;
		/*A region represents a geographic location in which your application may run.*/ region?: HerokuPlatformAPIRegion
	 };
	'add-on-service'?: HerokuPlatformAPIAddOnService;
	/*Add-ons represent add-ons that have been provisioned and attached to one or more apps.*/ 'add-on'?: HerokuPlatformAPIAddOn;
	/*An app feature represents a Heroku labs capability that can be enabled or disabled for an app on Heroku.*/ 'app-feature'?: { 
		/*when app feature was created*/ created_at?: string;
		/*description of app feature*/ description?: string;
		/*documentation URL of app feature*/ doc_url?: string;
		/*whether or not app feature has been enabled*/ enabled?: boolean;
		/*unique identifier of app feature*/ id?: string;
		/*unique name of app feature*/ name?: string;
		/*state of app feature*/ state?: string;
		/*when app feature was updated*/ updated_at?: string;
		/*user readable feature name*/ display_name?: string;
		/*e-mail to send feedback about the feature*/ feedback_email?: string
	 };
	/*App formation set describes the combination of process types with their quantities and sizes as well as application process tier*/ 'app-formation-set'?: HerokuPlatformAPIApplicationFormationSet;
	/*An app setup represents an app on Heroku that is setup using an environment, addons, and scripts described in an app.json manifest file.*/ 'app-setup'?: HerokuSetupAPIAppSetup;
	/*An app transfer represents a two party interaction for transferring ownership of an app.*/ 'app-transfer'?: HerokuPlatformAPIAppTransfer;
	/*An app represents the program that you would like to deploy and run on Heroku.*/ app?: HerokuPlatformAPIApp;
	/*A build result contains the output from a build.*/ 'build-result'?: { 
		/*identity of build*/ build?: { 
			id?: Id8;
			status?: Status;
			output_stream_url?: OutputStreamUrl
		 };
		/*status from the build*/ exit_code?: number;
		/*A list of all the lines of a build's output. This has been replaced by the `output_stream_url` attribute on the build resource.*/ lines?: /*a single line of output to STDOUT or STDERR from the build.*/ { 
			/*The output stream where the line was sent.*/ stream?: 'STDOUT' | 'STDERR';
			/*A line of output from the build.*/ line?: string
		 }[]
	 };
	/*A build represents the process of transforming a code tarball into a slug*/ build?: HerokuBuildAPIBuild;
	/*A buildpack installation represents a buildpack that will be run against an app.*/ 'buildpack-installation'?: { 
		/*determines the order in which the buildpacks will execute*/ ordinal?: number;
		/*buildpack*/ buildpack?: { 
			url?: Url;
			/*either the shorthand name (heroku official buildpacks) or url (unofficial buildpacks) of the buildpack for the app*/ name?: string
		 }
	 };
	/*A collaborator represents an account that has been given access to an app on Heroku.*/ collaborator?: HerokuPlatformAPICollaborator;
	/*Config Vars allow you to manage the configuration information provided to an app on Heroku.*/ 'config-var'?: Record<string, string>;
	/*A credit represents value that will be used up before further charges are assigned to an account.*/ credit?: { 
		/*total value of credit in cents*/ amount?: number;
		/*remaining value of credit in cents*/ balance?: number;
		/*when credit was created*/ created_at?: string;
		/*when credit will expire*/ expires_at?: string;
		/*unique identifier of credit*/ id?: string;
		/*a name for credit*/ title?: string;
		/*when credit was updated*/ updated_at?: string
	 };
	/*Domains define what web routes should be routed to an app on Heroku.*/ domain?: HerokuPlatformAPIDomain;
	/*Dyno sizes are the values and details of sizes that can be assigned to dynos. This information can also be found at : [https://devcenter.heroku.com/articles/dyno-types](https://devcenter.heroku.com/articles/dyno-types).*/ 'dyno-size'?: { 
		/*minimum vCPUs, non-dedicated may get more depending on load*/ compute?: number;
		/*price information for this dyno size*/ cost?: 
			/*price information for this dyno size*/ null |
			/*price information for this dyno size*/ {  }
		;
		/*whether this dyno will be dedicated to one user*/ dedicated?: boolean;
		/*unit of consumption for Heroku Enterprise customers*/ dyno_units?: number;
		/*unique identifier of this dyno size*/ id?: string;
		/*amount of RAM in GB*/ memory?: number;
		/*the name of this dyno-size*/ name?: string;
		/*whether this dyno can only be provisioned in a private space*/ private_space_only?: boolean
	 };
	/*Dynos encapsulate running processes of an app on Heroku. Detailed information about dyno sizes can be found at: [https://devcenter.heroku.com/articles/dyno-types](https://devcenter.heroku.com/articles/dyno-types).*/ dyno?: HerokuPlatformAPIDyno;
	/*An event represents an action performed on another API resource.*/ event?: { 
		/*the operation performed on the resource*/ action?: 'create' | 'destroy' | 'update';
		/*user that performed the operation*/ actor?: { email?: Email; id?: Id4 };
		/*when the event was created*/ created_at?: string;
		/*the serialized resource affected by the event*/ data?: 
			HerokuPlatformAPIAccount |
			HerokuPlatformAPIAddOn |
			HerokuPlatformAPIAddOnAttachment |
			HerokuPlatformAPIApp |
			HerokuPlatformAPIApplicationFormationSet |
			HerokuSetupAPIAppSetup |
			HerokuPlatformAPIAppTransfer |
			HerokuBuildAPIBuild |
			HerokuPlatformAPICollaborator |
			HerokuPlatformAPIDomain |
			HerokuPlatformAPIDyno |
			HerokuPlatformAPIFailedEvent |
			HerokuPlatformAPIFormation |
			HerokuPlatformAPIInboundRuleset |
			HerokuPlatformAPIOrganization |
			HerokuPlatformAPIRelease |
			HerokuPlatformAPISpace
		;
		/*unique identifier of an event*/ id?: string;
		/*data fields that were changed during update with previous values*/ previous_data?: {  };
		/*when the event was published*/ published_at?: 
			/*when the event was published*/ null |
			/*when the event was published*/ string
		;
		resource?: Resource;
		/*a numeric string representing the event's sequence*/ sequence?: 
			/*a numeric string representing the event's sequence*/ null |
			/*a numeric string representing the event's sequence*/ string
		;
		/*when the event was updated (same as created)*/ updated_at?: string;
		/*the event's API version string*/ version?: string
	 };
	/*A failed event represents a failure of an action performed on another API resource.*/ 'failed-event'?: HerokuPlatformAPIFailedEvent;
	/*Filters are special endpoints to allow for API consumers to specify a subset of resources to consume in order to reduce the number of requests that are performed.  Each filter endpoint endpoint is responsible for determining its supported request format.  The endpoints are over POST in order to handle large request bodies without hitting request uri query length limitations, but the requests themselves are idempotent and will not have side effects.*/ 'filter-apps'?: {  };
	/*The formation of processes that should be maintained for an app. Update the formation to scale processes or change dyno sizes. Available process type names and commands are defined by the `process_types` attribute for the [slug](#slug) currently released on an app.*/ formation?: HerokuPlatformAPIFormation;
	/*Identity Providers represent the SAML configuration of an Organization.*/ 'identity-provider'?: { 
		/*raw contents of the public certificate (eg: .crt or .pem file)*/ certificate?: string;
		/*when provider record was created*/ created_at?: string;
		/*URL identifier provided by the identity provider*/ entity_id?: string;
		id?: Id12;
		/*single log out URL for this identity provider*/ slo_target_url?: string;
		/*single sign on URL for this identity provider*/ sso_target_url?: string;
		/*organization associated with this identity provider*/ organization?: 
			/*organization associated with this identity provider*/ null |
			/*organization associated with this identity provider*/ { name?: Name }
		;
		/*when the identity provider record was updated*/ updated_at?: string
	 };
	/*An inbound-ruleset is a collection of rules that specify what hosts can or cannot connect to an application.*/ 'inbound-ruleset'?: HerokuPlatformAPIInboundRuleset;
	/*An invitation represents an invite sent to a user to use the Heroku platform.*/ invitation?: { 
		/*if the invitation requires verification*/ verification_required?: boolean;
		/*when invitation was created*/ created_at?: string;
		user?: { email?: Email; id?: Id4 }
	 };

	/*An invoice address represents the address that should be listed on an invoice.*/ 'invoice-address'?: { 
		/*invoice street address line 1*/ address_1?: string;
		/*invoice street address line 2*/ address_2?: string;
		/*invoice city*/ city?: string;
		/*country*/ country?: string;
		heroku_id?: string;
		/*metadata / additional information to go on invoice*/ other?: string;
		/*invoice zip code*/ postal_code?: string;
		/*invoice state*/ state?: string;
		/*flag to use the invoice address for an account or not*/ use_invoice_address?: boolean
	 };

	/*An invoice is an itemized bill of goods for an account which includes pricing and charges.*/ invoice?: { 
		/*total charges on this invoice*/ charges_total?: number;
		/*when invoice was created*/ created_at?: string;
		/*total credits on this invoice*/ credits_total?: number;
		/*unique identifier of this invoice*/ id?: string;
		/*human readable invoice number*/ number?: number;
		/*the ending date that the invoice covers*/ period_end?: string;
		/*the starting date that this invoice covers*/ period_start?: string;
		/*payment status for this invoice (pending, successful, failed)*/ state?: number;
		/*combined total of charges and credits on this invoice*/ total?: number;
		/*when invoice was updated*/ updated_at?: string
	 };

	/*Keys represent public SSH keys associated with an account and are used to authorize accounts as they are performing git operations.*/ key?: { 
		/*comment on the key*/ comment?: string;
		/*when key was created*/ created_at?: string;
		/*deprecated. Please refer to 'comment' instead*/ email?: string;
		/*a unique identifying string based on contents*/ fingerprint?: string;
		/*unique identifier of this key*/ id?: string;
		/*full public_key as uploaded*/ public_key?: string;
		/*when key was updated*/ updated_at?: string
	 };

	/*[Log drains](https://devcenter.heroku.com/articles/log-drains) provide a way to forward your Heroku logs to an external syslog server for long-term archiving. This external service must be configured to receive syslog packets from Heroku, whereupon its URL can be added to an app using this API. Some add-ons will add a log drain when they are provisioned to an app. These drains can only be removed by removing the add-on.*/ 'log-drain'?: { 
		/*add-on that created the drain*/ addon?: 
			/*add-on that created the drain*/ { id?: Id2; name?: Name3 } |
			/*add-on that created the drain*/ null
		;
		/*when log drain was created*/ created_at?: string;
		/*unique identifier of this log drain*/ id?: string;
		/*token associated with the log drain*/ token?: string;
		/*when log drain was updated*/ updated_at?: string;
		/*url associated with the log drain*/ url?: string
	 };

	/*A log session is a reference to the http based log stream for an app.*/ 'log-session'?: { 
		/*when log connection was created*/ created_at?: string;
		/*unique identifier of this log session*/ id?: string;
		/*URL for log streaming session*/ logplex_url?: string;
		/*when log session was updated*/ updated_at?: string
	 };

	/*OAuth authorizations represent clients that a Heroku user has authorized to automate, customize or extend their usage of the platform. For more information please refer to the [Heroku OAuth documentation](https://devcenter.heroku.com/articles/oauth)*/ 'oauth-authorization'?: { 
		/*access token for this authorization*/ access_token?: 
			/*access token for this authorization*/ null |
			/*access token for this authorization*/ { 
				/*seconds until OAuth token expires; may be `null` for tokens with indefinite lifetime*/ expires_in?: ExpiresIn;
				/*unique identifier of OAuth token*/ id?: Id13;
				/*contents of the token to be used for authorization*/ token?: Token
			 }
		;

		/*identifier of the client that obtained this authorization, if any*/ client?: 
			/*identifier of the client that obtained this authorization, if any*/ null |
			/*identifier of the client that obtained this authorization, if any*/ { 
				/*unique identifier of this OAuth client*/ id?: Id14;
				/*OAuth client name*/ name?: Name9;
				/*endpoint for redirection after authorization with OAuth client*/ redirect_uri?: RedirectUri
			 }
		;
		/*when OAuth authorization was created*/ created_at?: string;
		/*this authorization's grant*/ grant?: 
			/*this authorization's grant*/ null |
			/*this authorization's grant*/ { 
				/*grant code received from OAuth web application authorization*/ code?: Code;
				/*seconds until OAuth grant expires*/ expires_in?: number;
				/*unique identifier of OAuth grant*/ id?: string
			 }
		;
		/*unique identifier of OAuth authorization*/ id?: Id15;
		/*refresh token for this authorization*/ refresh_token?: 
			/*refresh token for this authorization*/ null |
			/*refresh token for this authorization*/ { expires_in?: ExpiresIn; id?: Id13; token?: Token }
		;
		/*The scope of access OAuth authorization allows*/ scope?: string[];
		/*when OAuth authorization was updated*/ updated_at?: string;
		/*authenticated user associated with this authorization*/ user?: { id?: Id4; email?: Email; full_name?: Name8 }
	 };

	/*OAuth clients are applications that Heroku users can authorize to automate, customize or extend their usage of the platform. For more information please refer to the [Heroku OAuth documentation](https://devcenter.heroku.com/articles/oauth).*/ 'oauth-client'?: { 
		/*when OAuth client was created*/ created_at?: string;
		id?: Id14;
		/*whether the client is still operable given a delinquent account*/ ignores_delinquent?: 
			/*whether the client is still operable given a delinquent account*/ boolean |
			/*whether the client is still operable given a delinquent account*/ null
		;
		name?: Name9;
		redirect_uri?: RedirectUri;
		/*secret used to obtain OAuth authorizations under this client*/ secret?: Secret;
		/*when OAuth client was updated*/ updated_at?: string
	 };
	/*OAuth grants are used to obtain authorizations on behalf of a user. For more information please refer to the [Heroku OAuth documentation](https://devcenter.heroku.com/articles/oauth)*/ 'oauth-grant'?: {  };
	/*OAuth tokens provide access for authorized clients to act on behalf of a Heroku user to automate, customize or extend their usage of the platform. For more information please refer to the [Heroku OAuth documentation](https://devcenter.heroku.com/articles/oauth)*/ 'oauth-token'?: { 
		/*current access token*/ access_token?: { expires_in?: ExpiresIn; id?: Id13; token?: Token };
		/*authorization for this set of tokens*/ authorization?: { id?: Id15 };
		/*OAuth client secret used to obtain token*/ client?: 
			/*OAuth client secret used to obtain token*/ null |
			/*OAuth client secret used to obtain token*/ { secret?: Secret }
		;
		/*when OAuth token was created*/ created_at?: string;
		/*grant used on the underlying authorization*/ grant?: { 
			code?: Code;
			/*type of grant requested, one of `authorization_code` or `refresh_token`*/ type?: string
		 };
		id?: Id13;
		/*refresh token for this authorization*/ refresh_token?: { expires_in?: ExpiresIn; id?: Id13; token?: Token };
		/*OAuth session using this token*/ session?: { id?: Id13 };
		/*when OAuth token was updated*/ updated_at?: string;
		/*Reference to the user associated with this token*/ user?: { id?: Id4 }
	 };
	/*A list of add-ons the Organization uses across all apps*/ 'organization-add-on'?: {  };
	/*An organization collaborator represents an account that has been given access to an organization app on Heroku.*/ 'organization-app-collaborator'?: { 
		/*app collaborator belongs to*/ app?: { name?: Name1; id?: Id };
		created_at?: CreatedAt;
		id?: Id16;
		role?: Role;
		updated_at?: UpdatedAt;
		/*identity of collaborated account*/ user?: { email?: Email; federated?: Federated; id?: Id4 }
	 };

	/*An organization app encapsulates the organization specific functionality of Heroku apps.*/ 'organization-app'?: { 
		archived_at?: ArchivedAt;
		buildpack_provided_description?: BuildpackProvidedDescription;
		created_at?: CreatedAt1;
		git_url?: GitUrl;
		id?: Id;
		/*is the current member a collaborator on this app.*/ joined?: boolean;
		/*are other organization members forbidden from joining this app.*/ locked?: boolean;
		maintenance?: Maintenance;
		name?: Name1;
		/*organization that owns this app*/ organization?: 
			/*organization that owns this app*/ null |
			/*organization that owns this app*/ { name?: Name }
		;

		/*identity of app owner*/ owner?: 
			/*identity of app owner*/ null |
			/*identity of app owner*/ { email?: Email; id?: Id4 }
		;
		/*identity of app region*/ region?: { id?: Id6; name?: Name5 };
		released_at?: ReleasedAt;
		repo_size?: RepoSize;
		slug_size?: SlugSize;
		/*identity of space*/ space?: 
			/*identity of space*/ null |
			/*identity of space*/ { id?: Id11; name?: Name7 }
		;
		/*identity of app stack*/ stack?: { id?: Id7; name?: Name6 };
		updated_at?: UpdatedAt1;
		web_url?: WebUrl
	 };

	/*An organization feature represents a feature enabled on an organization account.*/ 'organization-feature'?: { 
		/*when organization feature was created*/ created_at?: string;
		/*description of organization feature*/ description?: string;
		/*documentation URL of organization feature*/ doc_url?: string;
		/*whether or not organization feature has been enabled*/ enabled?: boolean;
		/*unique identifier of organization feature*/ id?: string;
		/*unique name of organization feature*/ name?: string;
		/*state of organization feature*/ state?: string;
		/*when organization feature was updated*/ updated_at?: string;
		/*user readable feature name*/ display_name?: string;
		/*e-mail to send feedback about the feature*/ feedback_email?: string
	 };

	/*An organization invitation represents an invite to an organization.*/ 'organization-invitation'?: { 
		/*when invitation was created*/ created_at?: string;
		/*Unique identifier of an invitation*/ id?: string;
		invited_by?: { email?: Email; id?: Id4; name?: Name8 };
		organization?: { id?: Id5; name?: Name };
		role?: Role;
		/*when invitation was updated*/ updated_at?: string;
		user?: { email?: Email; id?: Id4; name?: Name8 }
	 };

	/*An organization invoice is an itemized bill of goods for an organization which includes pricing and charges.*/ 'organization-invoice'?: { 
		/*total add-ons charges in on this invoice*/ addons_total?: number;
		/*total database charges on this invoice*/ database_total?: number;
		/*total charges on this invoice*/ charges_total?: number;
		/*when invoice was created*/ created_at?: string;
		/*total credits on this invoice*/ credits_total?: number;
		/*The total amount of dyno units consumed across dyno types.*/ dyno_units?: number;
		/*unique identifier of this invoice*/ id?: string;
		/*human readable invoice number*/ number?: number;
		/*Status of the invoice payment.*/ payment_status?: string;
		/*the ending date that the invoice covers*/ period_end?: string;
		/*the starting date that this invoice covers*/ period_start?: string;
		/*total platform charges on this invoice*/ platform_total?: number;
		/*payment status for this invoice (pending, successful, failed)*/ state?: number;
		/*combined total of charges and credits on this invoice*/ total?: number;
		/*when invoice was updated*/ updated_at?: string;
		/*The total amount of hours consumed across dyno types.*/ weighted_dyno_hours?: number
	 };

	/*An organization member is an individual with access to an organization.*/ 'organization-member'?: { 
		/*when the membership record was created*/ created_at: string;
		/*email address of the organization member*/ email: string;
		/*whether the user is federated and belongs to an Identity Provider*/ federated: boolean;
		/*unique identifier of organization member*/ id?: string;
		role?: Role;
		/*whether the Enterprise organization member has two factor authentication enabled*/ two_factor_authentication?: boolean;
		/*when the membership record was updated*/ updated_at: string;
		/*user information for the membership*/ user?: { email?: Email; id?: Id4; name?: Name8 }
	 };

	/*Tracks an organization's preferences*/ 'organization-preferences'?: { 
		/*The default permission used when adding new members to the organization*/ 'default-permission'?: 'admin' | 'member' | 'viewer' | null;
		/*Whether whitelisting rules should be applied to add-on installations*/ 'whitelisting-enabled'?: 
			/*Whether whitelisting rules should be applied to add-on installations*/ boolean |
			/*Whether whitelisting rules should be applied to add-on installations*/ null
	 };
	/*Organizations allow you to manage access to a shared group of applications across your development team.*/ organization?: HerokuPlatformAPIOrganization;
	/*An outbound-ruleset is a collection of rules that specify what hosts Dynos are allowed to communicate with. */ 'outbound-ruleset'?: { 
		/*unique identifier of an outbound-ruleset*/ id?: string;
		/*when outbound-ruleset was created*/ created_at?: string;
		rules?: /*the combination of an IP address in CIDR notation, a from_port, to_port and protocol.*/ { 
			/*is the target destination in CIDR notation*/ target: string;
			/*an endpoint of communication in an operating system.*/ from_port: Port;
			to_port: Port;
			/*formal standards and policies comprised of rules, procedures and formats that define communication between two or more devices over a network*/ protocol: string
		 }[];
		created_by?: Email
	 };

	/*A password reset represents a in-process password reset attempt.*/ 'password-reset'?: { 
		/*when password reset was created*/ created_at?: string;
		user?: { email?: Email; id?: Id4 }
	 };
	/*An organization app permission is a behavior that is assigned to a user in an organization app.*/ 'organization-app-permission'?: HerokuPlatformAPIOrganizationAppPermission;
	/*Information about an app's coupling to a pipeline*/ 'pipeline-coupling'?: { 
		/*app involved in the pipeline coupling*/ app?: { id?: Id };
		/*when pipeline coupling was created*/ created_at?: string;
		/*unique identifier of pipeline coupling*/ id?: string;
		/*pipeline involved in the coupling*/ pipeline?: { /*unique identifier of pipeline*/ id?: Id18 };
		/*target pipeline stage*/ stage?: 'test' | 'review' | 'development' | 'staging' | 'production';
		/*when pipeline coupling was updated*/ updated_at?: string
	 };

	/*Promotion targets represent an individual app being promoted to*/ 'pipeline-promotion-target'?: { 
		/*the app which was promoted to*/ app?: { id?: Id };
		/*an error message for why the promotion failed*/ error_message?: 
			/*an error message for why the promotion failed*/ null |
			/*an error message for why the promotion failed*/ string
		;
		/*unique identifier of promotion target*/ id?: string;
		/*the promotion which the target belongs to*/ pipeline_promotion?: { /*unique identifier of promotion*/ id?: Id17 };
		/*the release which was created on the target app*/ release?: 
			/*the release which was created on the target app*/ { id?: Id9 } |
			/*the release which was created on the target app*/ null
		;
		/*status of promotion*/ status?: 'pending' | 'succeeded' | 'failed'
	 };

	/*Promotions allow you to move code from an app in a pipeline to all targets*/ 'pipeline-promotion'?: { 
		/*when promotion was created*/ created_at?: string;
		id?: Id17;
		/*the pipeline which the promotion belongs to*/ pipeline?: { id?: Id18 };
		/*the app being promoted from*/ source?: { 
			/*the app which was promoted from*/ app?: { id?: Id };
			/*the release used to promoted from*/ release?: { id?: Id9 }
		 };
		/*status of promotion*/ status?: 'pending' | 'completed';
		/*when promotion was updated*/ updated_at?: 
			/*when promotion was updated*/ string |
			/*when promotion was updated*/ null
	 };

	/*A pipeline allows grouping of apps into different stages.*/ pipeline?: { 
		/*when pipeline was created*/ created_at?: string;
		id?: Id18;
		/*name of pipeline*/ name?: string;
		/*when pipeline was updated*/ updated_at?: string
	 };

	/*Plans represent different configurations of add-ons that may be added to apps. Endpoints under add-on services can be accessed without authentication.*/ plan?: { 
		/*identity of add-on service*/ addon_service?: { id?: Id1; name?: Name2 };
		/*when plan was created*/ created_at?: string;
		/*the compliance regimes applied to an add-on plan*/ compliance?: 
			/*the compliance regimes applied to an add-on plan*/ null |
			/*the compliance regimes applied to an add-on plan*/ /*compliance requirements an add-on plan must adhere to*/ 'HIPAA' | 'PCI'[]
		;
		/*whether this plan is the default for its add-on service*/ default?: boolean;
		/*description of plan*/ description?: string;
		/*human readable name of the add-on plan*/ human_name?: string;
		id?: Id3;
		/*whether this plan is installable to a Private Spaces app*/ installable_inside_private_network?: boolean;
		/*whether this plan is installable to a Common Runtime app*/ installable_outside_private_network?: boolean;
		name?: Name4;
		/*price*/ price?: { 
			/*price in cents per unit of plan*/ cents?: number;
			/*unit of price for plan*/ unit?: string
		 };
		/*whether this plan is the default for apps in Private Spaces*/ space_default?: boolean;
		/*release status for plan*/ state?: string;
		/*when plan was updated*/ updated_at?: string;
		/*whether this plan is publicly visible*/ visible?: boolean
	 };

	/*Rate Limit represents the number of request tokens each account holds. Requests to this endpoint do not count towards the rate limit.*/ 'rate-limit'?: { 
		/*allowed requests remaining in current interval*/ remaining?: number
	 };
	region?: HerokuPlatformAPIRegion;
	/*A release represents a combination of code, config vars and add-ons for an app on Heroku.*/ release?: HerokuPlatformAPIRelease;
	/*A slug is a snapshot of your application code that is ready to run on the platform.*/ slug?: { 
		/*pointer to the url where clients can fetch or store the actual release binary*/ blob?: { 
			/*method to be used to interact with the slug blob*/ method?: string;
			/*URL to interact with the slug blob*/ url?: string
		 };

		/*description from buildpack of slug*/ buildpack_provided_description?: 
			/*description from buildpack of slug*/ null |
			/*description from buildpack of slug*/ string
		;

		/*an optional checksum of the slug for verifying its integrity*/ checksum?: 
			/*an optional checksum of the slug for verifying its integrity*/ null |
			/*an optional checksum of the slug for verifying its integrity*/ string
		;

		/*identification of the code with your version control system (eg: SHA of the git HEAD)*/ commit?: 
			/*identification of the code with your version control system (eg: SHA of the git HEAD)*/ null |
			/*identification of the code with your version control system (eg: SHA of the git HEAD)*/ string
		;

		/*an optional description of the provided commit*/ commit_description?: 
			/*an optional description of the provided commit*/ null |
			/*an optional description of the provided commit*/ string
		;
		/*when slug was created*/ created_at?: string;
		id?: Id10;
		/*hash mapping process type names to their respective command*/ process_types?: Record<string, string>;
		/*size of slug, in bytes*/ size?: 
			/*size of slug, in bytes*/ number |
			/*size of slug, in bytes*/ null
		;
		/*identity of slug stack*/ stack?: { id?: Id7; name?: Name6 };
		/*when slug was updated*/ updated_at?: string
	 };
	/*SMS numbers are used for recovery on accounts with two-factor authentication enabled.*/ 'sms-number'?: { sms_number?: SmsNumber };
	/*SNI Endpoint is a public address serving a custom SSL cert for HTTPS traffic, using the SNI TLS extension, to a Heroku app.*/ 'sni-endpoint'?: { 
		/*raw contents of the public certificate chain (eg: .crt or .pem file)*/ certificate_chain?: string;
		/*deprecated; refer to GET /apps/:id/domains for valid CNAMEs for this app*/ cname?: string;
		/*when endpoint was created*/ created_at?: string;
		/*unique identifier of this SNI endpoint*/ id?: string;
		/*unique name for SNI endpoint*/ name?: string;
		/*when SNI endpoint was updated*/ updated_at?: string
	 };

	/*A source is a location for uploading and downloading an application's source code.*/ source?: { 
		/*pointer to the URL where clients can fetch or store the source*/ source_blob?: { 
			/*URL to download the source*/ get_url?: string;
			/*URL to upload the source*/ put_url?: string
		 }
	 };

	/*Space access represents the permissions a particular user has on a particular space.*/ 'space-app-access'?: { 
		/*space user belongs to*/ space?: { name?: Name1; id?: Id };
		created_at?: CreatedAt2;
		id?: Id11;
		/*user space permissions*/ permissions?: { description?: string; name?: string }[];
		updated_at?: UpdatedAt2;
		/*identity of user account*/ user?: { email?: Email; id?: Id4 }
	 };

	/*Network address translation (NAT) for stable outbound IP addresses from a space*/ 'space-nat'?: { 
		/*when network address translation for a space was created*/ created_at?: string;
		/*potential IPs from which outbound network traffic will originate*/ sources?: string[];
		/*availability of network address translation for a space*/ state?: 'disabled' | 'updating' | 'enabled';
		/*when network address translation for a space was updated*/ updated_at?: string
	 };
	/*A space is an isolated, highly available, secure app execution environments, running in the modern VPC substrate.*/ space?: HerokuPlatformAPISpace;
	/*[SSL Endpoint](https://devcenter.heroku.com/articles/ssl-endpoint) is a public address serving custom SSL cert for HTTPS traffic to a Heroku app. Note that an app must have the `ssl:endpoint` add-on installed before it can provision an SSL Endpoint using these APIs.*/ 'ssl-endpoint'?: { 
		/*application associated with this ssl-endpoint*/ app?: { id?: Id; name?: Name1 };
		/*raw contents of the public certificate chain (eg: .crt or .pem file)*/ certificate_chain?: string;
		/*canonical name record, the address to point a domain at*/ cname?: string;
		/*when endpoint was created*/ created_at?: string;
		/*unique identifier of this SSL endpoint*/ id?: string;
		/*unique name for SSL endpoint*/ name?: string;
		/*when endpoint was updated*/ updated_at?: string
	 };

	/*Stacks are the different application execution environments available in the Heroku platform.*/ stack?: { 
		/*when stack was introduced*/ created_at?: string;
		id?: Id7;
		name?: Name6;
		/*availability of this stack: beta, deprecated or public*/ state?: string;
		/*when stack was last modified*/ updated_at?: string
	 };

	/*Tracks a user's preferences and message dismissals*/ 'user-preferences'?: { 
		/*User's default timezone*/ timezone?: 
			/*User's default timezone*/ string |
			/*User's default timezone*/ null
		;

		/*User's default organization*/ 'default-organization'?: 
			/*User's default organization*/ string |
			/*User's default organization*/ null
		;

		/*Whether the user has dismissed the GitHub link banner*/ 'dismissed-github-banner'?: 
			/*Whether the user has dismissed the GitHub link banner*/ boolean |
			/*Whether the user has dismissed the GitHub link banner*/ null
		;

		/*Whether the user has dismissed the getting started banner*/ 'dismissed-getting-started'?: 
			/*Whether the user has dismissed the getting started banner*/ boolean |
			/*Whether the user has dismissed the getting started banner*/ null
		;

		/*Whether the user has dismissed the Organization Access Controls banner*/ 'dismissed-org-access-controls'?: 
			/*Whether the user has dismissed the Organization Access Controls banner*/ boolean |
			/*Whether the user has dismissed the Organization Access Controls banner*/ null
		;

		/*Whether the user has dismissed the Organization Wizard*/ 'dismissed-org-wizard-notification'?: 
			/*Whether the user has dismissed the Organization Wizard*/ boolean |
			/*Whether the user has dismissed the Organization Wizard*/ null
		;

		/*Whether the user has dismissed the Pipelines banner*/ 'dismissed-pipelines-banner'?: 
			/*Whether the user has dismissed the Pipelines banner*/ boolean |
			/*Whether the user has dismissed the Pipelines banner*/ null
		;

		/*Whether the user has dismissed the GitHub banner on a pipeline overview*/ 'dismissed-pipelines-github-banner'?: 
			/*Whether the user has dismissed the GitHub banner on a pipeline overview*/ boolean |
			/*Whether the user has dismissed the GitHub banner on a pipeline overview*/ null
		;

		/*Which pipeline uuids the user has dismissed the GitHub banner for*/ 'dismissed-pipelines-github-banners'?: 
			/*Which pipeline uuids the user has dismissed the GitHub banner for*/ null |
			/*Which pipeline uuids the user has dismissed the GitHub banner for*/ Id18[]
		;

		/*Whether the user has dismissed the 2FA SMS banner*/ 'dismissed-sms-banner'?: 
			/*Whether the user has dismissed the 2FA SMS banner*/ boolean |
			/*Whether the user has dismissed the 2FA SMS banner*/ null
	 };

	/*Entities that have been whitelisted to be used by an Organization*/ 'whitelisted-add-on-service'?: { 
		/*when the add-on service was whitelisted*/ added_at?: string;
		/*the user which whitelisted the Add-on Service*/ added_by?: { 
			/*unique email address of account*/ email?: string;
			/*unique identifier of an account*/ id?: string
		 };
		/*the Add-on Service whitelisted for use*/ addon_service?: { id?: Id1; name?: Name2; human_name?: HumanName };
		/*unique identifier for this whitelisting entity*/ id?: string
	 }
 };

export type Name = string;
export type Id = string;
export type Name1 = string;

export type HerokuPlatformAPIAddOnService = { 
	/*npm package name of the add-on service's Heroku CLI plugin*/ cli_plugin_name?: 
		/*npm package name of the add-on service's Heroku CLI plugin*/ string |
		/*npm package name of the add-on service's Heroku CLI plugin*/ null
	;
	/*when add-on-service was created*/ created_at?: string;
	/*human-readable name of the add-on service provider*/ human_name?: HumanName;
	/*unique identifier of this add-on-service*/ id?: Id1;
	/*unique name of this add-on-service*/ name?: Name2;
	/*release status for add-on service*/ state?: 'alpha' | 'beta' | 'ga' | 'shutdown';
	/*whether or not apps can have access to more than one instance of this add-on at the same time*/ supports_multiple_installations?: boolean;
	/*whether or not apps can have access to add-ons billed to a different app*/ supports_sharing?: boolean;
	/*when add-on-service was updated*/ updated_at?: string
 };

export type Id1 = string;
export type Name2 = string;
export type Id2 = string;
export type Name3 = string;
export type Id3 = string;
export type Name4 = string;
export type Email = string;
export type Id4 = string;
export type Id5 = string;
export type Id6 = string;
export type Name5 = string;
export type Id7 = string;
export type Name6 = string;
export type Id8 = string;
export type Status = 'failed' | 'pending' | 'succeeded';
export type OutputStreamUrl = string;
export type Url = string;
export type Federated = boolean;
export type Id9 = string;

export type HerokuPlatformAPIAccount = { 
	/*whether to allow third party web activity tracking*/ allow_tracking?: boolean;
	/*whether allowed to utilize beta Heroku features*/ beta?: boolean;
	/*when account was created*/ created_at?: string;
	/*unique email address of account*/ email?: Email;
	/*whether the user is federated and belongs to an Identity Provider*/ federated?: Federated;
	/*unique identifier of an account*/ id?: Id4;
	/*Identity Provider details for federated users.*/ identity_provider?: 
		/*Identity Provider details for federated users.*/ { 
			/*unique identifier of this identity provider*/ id?: Id12;
			organization?: { /*unique name of organization*/ name?: Name }
		 } |
		/*Identity Provider details for federated users.*/ null
	;

	/*when account last authorized with Heroku*/ last_login?: 
		/*when account last authorized with Heroku*/ string |
		/*when account last authorized with Heroku*/ null
	;
	/*full name of the account owner*/ name?: Name8;
	/*SMS number of account*/ sms_number?: SmsNumber;
	/*when account was suspended*/ suspended_at?: 
		/*when account was suspended*/ string |
		/*when account was suspended*/ null
	;

	/*when account became delinquent*/ delinquent_at?: 
		/*when account became delinquent*/ string |
		/*when account became delinquent*/ null
	;
	/*whether two-factor auth is enabled on the account*/ two_factor_authentication?: boolean;
	/*when account was updated*/ updated_at?: string;
	/*whether account has been verified with billing information*/ verified?: boolean;
	/*organization selected by default*/ default_organization?: 
		/*organization selected by default*/ { /*unique identifier of organization*/ id?: Id5; name?: Name } |
		/*organization selected by default*/ null
 };

export type HerokuPlatformAPIAddOn = { 
	/*provider actions for this specific add-on*/ actions?: {  }[];
	/*identity of add-on service*/ addon_service?: { id?: Id1; name?: Name2 };
	/*billing application associated with this add-on*/ app?: { id?: Id; name?: Name1 };
	/*config vars exposed to the owning app by this add-on*/ config_vars?: string[];
	/*when add-on was created*/ created_at?: string;
	id?: Id2;
	name?: Name3;
	/*identity of add-on plan*/ plan?: { id?: Id3; name?: Name4 };
	/*id of this add-on with its provider*/ provider_id?: string;
	/*state in the add-on's lifecycle*/ state?: 'provisioning' | 'provisioned' | 'deprovisioned';
	/*when add-on was updated*/ updated_at?: string;
	/*URL for logging into web interface of add-on (e.g. a dashboard)*/ web_url?: 
		/*URL for logging into web interface of add-on (e.g. a dashboard)*/ null |
		/*URL for logging into web interface of add-on (e.g. a dashboard)*/ string
 };

export type HerokuPlatformAPIAddOnAttachment = { 
	/*identity of add-on*/ addon?: { 
		/*unique identifier of add-on*/ id: Id2;
		/*globally unique name of the add-on*/ name: Name3;
		/*billing application associated with this add-on*/ app: { 
			/*unique identifier of app*/ id?: Id;
			/*unique name of app*/ name?: Name1
		 };

		/*identity of add-on plan*/ plan?: { 
			/*unique identifier of this plan*/ id?: Id3;
			/*unique name of this plan*/ name?: Name4
		 }
	 };
	/*application that is attached to add-on*/ app?: { id?: Id; name?: Name1 };
	/*when add-on attachment was created*/ created_at?: string;
	/*unique identifier of this add-on attachment*/ id?: string;
	/*unique name for this add-on attachment to this app*/ name?: string;
	/*attachment namespace*/ namespace?: 
		/*attachment namespace*/ null |
		/*attachment namespace*/ string
	;
	/*when add-on attachment was updated*/ updated_at?: string;
	/*URL for logging into web interface of add-on in attached app context*/ web_url?: 
		/*URL for logging into web interface of add-on in attached app context*/ null |
		/*URL for logging into web interface of add-on in attached app context*/ string
 };

export type HerokuPlatformAPIApp = { 
	/*when app was archived*/ archived_at?: ArchivedAt;
	/*description from buildpack of app*/ buildpack_provided_description?: BuildpackProvidedDescription;
	/*identity of the stack that will be used for new builds*/ build_stack?: { 
		/*unique identifier of stack*/ id?: Id7;
		/*unique name of stack*/ name?: Name6
	 };
	/*when app was created*/ created_at?: CreatedAt1;
	/*git repo URL of app*/ git_url?: GitUrl;
	id?: Id;
	/*maintenance status of app*/ maintenance?: Maintenance;
	name?: Name1;
	/*identity of app owner*/ owner?: { email?: Email; id?: Id4 };
	/*identity of organization*/ organization?: 
		/*identity of organization*/ null |
		/*identity of organization*/ { id?: Id5; name?: Name }
	;
	/*identity of app region*/ region?: { id?: Id6; name?: Name5 };
	/*when app was released*/ released_at?: ReleasedAt;
	/*git repo size in bytes of app*/ repo_size?: RepoSize;
	/*slug size in bytes of app*/ slug_size?: SlugSize;
	/*identity of space*/ space?: 
		/*identity of space*/ null |
		/*identity of space*/ { 
			/*unique identifier of space*/ id?: Id11;
			/*unique name of space*/ name?: Name7;
			/*true if this space has shield enabled*/ shield?: Shield
		 }
	;
	/*identity of app stack*/ stack?: { id?: Id7; name?: Name6 };
	/*when app was updated*/ updated_at?: UpdatedAt1;
	/*web URL of app*/ web_url?: WebUrl
 };

export type HerokuPlatformAPIApplicationFormationSet = { 
	/*a string representation of the formation set*/ description?: string;
	/*application process tier*/ process_tier?: 'production' | 'traditional' | 'free' | 'hobby' | 'private';
	/*app being described by the formation-set*/ app?: { name?: Name1; id?: Id };
	/*last time fomation-set was updated*/ updated_at?: string
 };

export type HerokuSetupAPIAppSetup = { 
	/*unique identifier of app setup*/ id?: string;
	/*when app setup was created*/ created_at?: string;
	/*when app setup was updated*/ updated_at?: string;
	/*the overall status of app setup*/ status?: 'failed' | 'pending' | 'succeeded';
	/*reason that app setup has failed*/ failure_message?: 
		/*reason that app setup has failed*/ string |
		/*reason that app setup has failed*/ null
	;
	/*identity of app*/ app?: { id?: Id; name?: Name1 };
	/*identity and status of build*/ build?: 
		/*identity and status of build*/ null |
		/*identity and status of build*/ { 
			/*unique identifier of build*/ id?: Id8;
			/*status of build*/ status?: Status;
			/*Build process output will be available from this URL as a stream. The stream is available as either `text/plain` or `text/event-stream`. Clients should be prepared to handle disconnects and can resume the stream by sending a `Range` header (for `text/plain`) or a `Last-Event-Id` header (for `text/event-stream`).*/ output_stream_url?: OutputStreamUrl
		 }
	;
	/*errors associated with invalid app.json manifest file*/ manifest_errors?: string[];
	/*result of postdeploy script*/ postdeploy?: 
		/*result of postdeploy script*/ { 
			/*output of the postdeploy script*/ output?: string;
			/*The exit code of the postdeploy script*/ exit_code?: number
		 } |
		/*result of postdeploy script*/ null
	;

	/*fully qualified success url*/ resolved_success_url?: 
		/*fully qualified success url*/ string |
		/*fully qualified success url*/ null
 };

export type HerokuPlatformAPIAppTransfer = { 
	/*app involved in the transfer*/ app?: { name?: Name1; id?: Id };
	/*when app transfer was created*/ created_at?: string;
	/*unique identifier of app transfer*/ id?: string;
	/*identity of the owner of the transfer*/ owner?: { email?: Email; id?: Id4 };
	/*identity of the recipient of the transfer*/ recipient?: { email?: Email; id?: Id4 };
	/*the current state of an app transfer*/ state?: 'pending' | 'accepted' | 'declined';
	/*when app transfer was updated*/ updated_at?: string
 };

export type HerokuBuildAPIBuild = { 
	/*app that the build belongs to*/ app?: { id?: Id };
	/*buildpacks executed for this build, in order*/ buildpacks?: 
		/*buildpacks executed for this build, in order*/ /*Buildpack to execute in a build*/ { 
			/*location of the buildpack for the app. Either a url (unofficial buildpacks) or an internal urn (heroku official buildpacks).*/ url?: Url
		 }[] |
		/*buildpacks executed for this build, in order*/ null
	;
	/*when build was created*/ created_at?: string;
	id?: Id8;
	output_stream_url?: OutputStreamUrl;
	/*location of gzipped tarball of source code used to create build*/ source_blob?: { 
		/*an optional checksum of the gzipped tarball for verifying its integrity*/ checksum?: 
			/*an optional checksum of the gzipped tarball for verifying its integrity*/ null |
			/*an optional checksum of the gzipped tarball for verifying its integrity*/ string
		;
		/*URL where gzipped tar archive of source code for build was downloaded.*/ url?: string;
		/*Version of the gzipped tarball.*/ version?: 
			/*Version of the gzipped tarball.*/ string |
			/*Version of the gzipped tarball.*/ null
	 };

	/*release resulting from the build*/ release?: 
		/*release resulting from the build*/ null |
		/*release resulting from the build*/ { /*unique identifier of release*/ id?: Id9 }
	;

	/*slug created by this build*/ slug?: 
		/*slug created by this build*/ { /*unique identifier of slug*/ id?: Id10 } |
		/*slug created by this build*/ null
	;
	status?: Status;
	/*when build was updated*/ updated_at?: string;
	/*user that started the build*/ user?: { id?: Id4; email?: Email }
 };

export type HerokuPlatformAPICollaborator = { 
	/*app collaborator belongs to*/ app: { name?: Name1; id?: Id };
	/*when collaborator was created*/ created_at: CreatedAt;
	/*unique identifier of collaborator*/ id: Id16;
	permissions?: HerokuPlatformAPIOrganizationAppPermission[];
	/*role in the organization*/ role?: Role;
	/*when collaborator was updated*/ updated_at: UpdatedAt;
	/*identity of collaborated account*/ user: { email?: Email; federated?: Federated; id?: Id4 }
 };

export type HerokuPlatformAPIDomain = { 
	/*app that owns the domain*/ app?: { name?: Name1; id?: Id };
	/*canonical name record, the address to point a domain at*/ cname?: 
		/*canonical name record, the address to point a domain at*/ null |
		/*canonical name record, the address to point a domain at*/ string
	;
	/*when domain was created*/ created_at?: string;
	/*full hostname*/ hostname?: string;
	/*unique identifier of this domain*/ id?: string;
	/*type of domain name*/ kind?: 'heroku' | 'custom';
	/*when domain was updated*/ updated_at?: string;
	/*status of this record's cname*/ status?: string
 };

export type HerokuPlatformAPIDyno = { 
	/*a URL to stream output from for attached processes or null for non-attached processes*/ attach_url?: 
		/*a URL to stream output from for attached processes or null for non-attached processes*/ string |
		/*a URL to stream output from for attached processes or null for non-attached processes*/ null
	;
	/*command used to start this process*/ command?: string;
	/*when dyno was created*/ created_at?: string;
	/*unique identifier of this dyno*/ id?: string;
	/*the name of this process on this dyno*/ name?: string;
	/*app release of the dyno*/ release?: { 
		id?: Id9;
		/*unique version assigned to the release*/ version?: Version
	 };
	/*app formation belongs to*/ app?: { name?: Name1; id?: Id };
	/*dyno size (default: "standard-1X")*/ size?: string;
	/*current status of process (either: crashed, down, idle, starting, or up)*/ state?: string;
	/*type of process*/ type?: string;
	/*when process last changed state*/ updated_at?: string
 };

export type Role = 'admin' | 'collaborator' | 'member' | 'owner' | null;
export type Id10 = string;
export type Version = number;
export type Id11 = string;
export type Name7 = string;
export type Shield = boolean;

export type Resource = 
	'addon' |
	'addon-attachment' |
	'app' |
	'app-setup' |
	'app-transfer' |
	'build' |
	'collaborator' |
	'domain' |
	'dyno' |
	'failed-event' |
	'formation' |
	'formation-set' |
	'inbound-ruleset' |
	'organization' |
	'release' |
	'space' |
	'user'
;

export type HerokuPlatformAPIFailedEvent = { 
	/*The attempted operation performed on the resource.*/ action?: 'create' | 'destroy' | 'update' | 'unknown';
	/*An HTTP status code.*/ code?: 
		/*An HTTP status code.*/ number |
		/*An HTTP status code.*/ null
	;

	/*ID of error raised.*/ error_id?: 
		/*ID of error raised.*/ string |
		/*ID of error raised.*/ null
	;
	/*A detailed error message.*/ message?: string;
	/*The HTTP method type of the failed action.*/ method?: 
		'DELETE' |
		'GET' |
		'HEAD' |
		'OPTIONS' |
		'PATCH' |
		'POST' |
		'PUT'
	;
	/*The path of the attempted operation.*/ path?: string;
	/*The related resource of the failed action.*/ resource?: 
		/*The related resource of the failed action.*/ { 
			/*Unique identifier of a resource.*/ id?: string;
			/*the type of resource affected*/ name?: Resource
		 } |
		/*The related resource of the failed action.*/ null
 };

export type HerokuPlatformAPIFormation = { 
	/*app formation belongs to*/ app?: { name?: Name1; id?: Id };
	/*command to use to launch this process*/ command?: string;
	/*when process type was created*/ created_at?: string;
	/*unique identifier of this process type*/ id?: string;
	/*number of processes to maintain*/ quantity?: number;
	/*dyno size (default: "standard-1X")*/ size?: string;
	/*type of process to maintain*/ type?: string;
	/*when dyno type was updated*/ updated_at?: string
 };

export type Id12 = string;

export type HerokuPlatformAPIInboundRuleset = { 
	/*unique identifier of an inbound-ruleset*/ id?: string;
	/*when inbound-ruleset was created*/ created_at?: string;
	rules?: /*the combination of an IP address in CIDR notation and whether to allow or deny it's traffic.*/ { 
		/*states whether the connection is allowed or denied*/ action: 'allow' | 'deny';
		/*is the request’s source in CIDR notation*/ source: string
	 }[];
	created_by?: Email
 };

export type ExpiresIn = 
	/*seconds until OAuth token expires; may be `null` for tokens with indefinite lifetime*/ null |
	/*seconds until OAuth token expires; may be `null` for tokens with indefinite lifetime*/ number
;

export type Id13 = string;
export type Token = string;

export type Name8 = 
	/*full name of the account owner*/ string |
	/*full name of the account owner*/ null
;

export type Id14 = string;
export type Name9 = string;
export type RedirectUri = string;
export type Id15 = string;
export type Secret = string;
export type Code = string;
export type CreatedAt = string;
export type Id16 = string;
export type UpdatedAt = string;

export type ArchivedAt = 
	/*when app was archived*/ null |
	/*when app was archived*/ string
;

export type BuildpackProvidedDescription = 
	/*description from buildpack of app*/ null |
	/*description from buildpack of app*/ string
;

export type CreatedAt1 = string;
export type GitUrl = string;
export type Maintenance = boolean;

export type ReleasedAt = 
	/*when app was released*/ null |
	/*when app was released*/ string
;

export type RepoSize = 
	/*git repo size in bytes of app*/ number |
	/*git repo size in bytes of app*/ null
;

export type SlugSize = 
	/*slug size in bytes of app*/ number |
	/*slug size in bytes of app*/ null
;

export type UpdatedAt1 = string;
export type WebUrl = string;

export type HerokuPlatformAPIOrganization = { 
	id?: Id5;
	/*when the organization was created*/ created_at?: string;
	/*whether charges incurred by the org are paid by credit card.*/ credit_card_collections?: boolean;
	/*whether to use this organization when none is specified*/ default?: boolean;
	/*upper limit of members allowed in an organization.*/ membership_limit?: 
		/*upper limit of members allowed in an organization.*/ number |
		/*upper limit of members allowed in an organization.*/ null
	;
	name?: Name;
	/*whether the org is provisioned licenses by salesforce.*/ provisioned_licenses?: boolean;
	role?: Role;
	/*type of organization.*/ type?: 'enterprise' | 'team';
	/*when the organization was updated*/ updated_at?: string
 };

export type Port = number;

export type HerokuPlatformAPIOrganizationAppPermission = { 
	/*The name of the app permission.*/ name?: string;
	/*A description of what the app permission allows.*/ description?: string
 };

export type Id17 = string;
export type Id18 = string;

export type HerokuPlatformAPIRegion = { 
	/*country where the region exists*/ country?: string;
	/*when region was created*/ created_at?: string;
	/*description of region*/ description?: string;
	/*unique identifier of region*/ id?: Id6;
	/*area in the country where the region exists*/ locale?: string;
	/*unique name of region*/ name?: Name5;
	/*whether or not region is available for creating a Private Space*/ private_capable?: boolean;
	/*provider of underlying substrate*/ provider?: { 
		/*name of provider*/ name?: string;
		/*region name used by provider*/ region?: string
	 };
	/*when region was updated*/ updated_at?: string
 };

export type HerokuPlatformAPIRelease = { 
	/*add-on plans installed on the app for this release*/ addon_plan_names?: Name4[];
	/*app involved in the release*/ app?: { name?: Name1; id?: Id };
	/*when release was created*/ created_at?: string;
	/*description of changes in this release*/ description?: string;
	id?: Id9;
	/*when release was updated*/ updated_at?: string;
	/*slug running in this release*/ slug?: 
		/*slug running in this release*/ { id?: Id10 } |
		/*slug running in this release*/ null
	;
	/*current status of the release*/ status?: 'failed' | 'pending' | 'succeeded';
	/*user that created the release*/ user?: { id?: Id4; email?: Email };
	version?: Version;
	/*indicates this release as being the current one for the app*/ current?: boolean
 };

export type SmsNumber = 
	/*SMS number of account*/ string |
	/*SMS number of account*/ null
;

export type CreatedAt2 = string;
export type UpdatedAt2 = string;

export type HerokuPlatformAPISpace = { 
	/*when space was created*/ created_at?: CreatedAt2;
	id?: Id11;
	name?: Name7;
	/*organization that owns this space*/ organization?: { name?: Name };
	/*identity of space region*/ region?: { id?: Id6; name?: Name5 };
	shield?: Shield;
	/*availability of this space*/ state?: 'allocating' | 'allocated' | 'deleting';
	/*when space was updated*/ updated_at?: UpdatedAt2
 };

export type HumanName = string;