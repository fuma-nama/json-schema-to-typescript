/**
* An account feature represents a Heroku labs capability that can be enabled or disabled for an account on Heroku.
*/
export interface HerokuPlatformAPIAccountFeature {
	created_at?: CreatedAt;
	description?: Description;
	doc_url?: DocUrl;
	enabled?: Enabled;
	id?: Id;
	name?: Name;
	state?: State;
	updated_at?: UpdatedAt;
	display_name?: DisplayName;
	feedback_email?: FeedbackEmail
}

/**
* when account feature was created
*/
export type CreatedAt = string;

/**
* description of account feature
*/
export type Description = string;

/**
* documentation URL of account feature
*/
export type DocUrl = string;

/**
* whether or not account feature has been enabled
*/
export type Enabled = boolean;

/**
* unique identifier of account feature
*/
export type Id = string;

/**
* unique name of account feature
*/
export type Name = string;

/**
* state of account feature
*/
export type State = string;

/**
* when account feature was updated
*/
export type UpdatedAt = string;

/**
* user readable feature name
*/
export type DisplayName = string;

/**
* e-mail to send feedback about the feature
*/
export type FeedbackEmail = string;

/**
* An account represents an individual signed up to use the Heroku platform.
*/
export interface HerokuPlatformAPIAccount {
	allow_tracking?: AllowTracking;
	beta?: Beta;
	created_at?: CreatedAt1;
	email?: Email;
	federated?: Federated;
	id?: Id1;
	/**
	* Identity Provider details for federated users.
	*/
	identity_provider?: 
		/**
		* Identity Provider details for federated users.
		*/
		{ id?: Id2; organization?: { name?: Name1 } } |

		/**
		* Identity Provider details for federated users.
		*/
		null
	;
	last_login?: LastLogin;
	name?: Name2;
	sms_number?: SmsNumber;
	suspended_at?: SuspendedAt;
	delinquent_at?: DelinquentAt;
	two_factor_authentication?: TwoFactorAuthentication;
	updated_at?: UpdatedAt1;
	verified?: Verified;
	/**
	* organization selected by default
	*/
	default_organization?: 
		/**
		* organization selected by default
		*/
		{ id?: Id3; name?: Name1 } |

		/**
		* organization selected by default
		*/
		null
}

/**
* whether to allow third party web activity tracking
*/
export type AllowTracking = boolean;

/**
* whether allowed to utilize beta Heroku features
*/
export type Beta = boolean;

/**
* when account was created
*/
export type CreatedAt1 = string;

/**
* unique email address of account
*/
export type Email = string;

/**
* whether the user is federated and belongs to an Identity Provider
*/
export type Federated = boolean;

/**
* unique identifier of an account
*/
export type Id1 = string;

/**
* unique identifier of this identity provider
*/
export type Id2 = string;

/**
* unique name of organization
*/
export type Name1 = string;

/**
* when account last authorized with Heroku
*/
export type LastLogin = 
	/**
	* when account last authorized with Heroku
	*/
	string |

	/**
	* when account last authorized with Heroku
	*/
	null
;

/**
* full name of the account owner
*/
export type Name2 = 
	/**
	* full name of the account owner
	*/
	string |

	/**
	* full name of the account owner
	*/
	null
;

/**
* SMS number of account
*/
export type SmsNumber = 
	/**
	* SMS number of account
	*/
	string |

	/**
	* SMS number of account
	*/
	null
;

/**
* when account was suspended
*/
export type SuspendedAt = 
	/**
	* when account was suspended
	*/
	string |

	/**
	* when account was suspended
	*/
	null
;

/**
* when account became delinquent
*/
export type DelinquentAt = 
	/**
	* when account became delinquent
	*/
	string |

	/**
	* when account became delinquent
	*/
	null
;

/**
* whether two-factor auth is enabled on the account
*/
export type TwoFactorAuthentication = boolean;

/**
* when account was updated
*/
export type UpdatedAt1 = string;

/**
* whether account has been verified with billing information
*/
export type Verified = boolean;

/**
* unique identifier of organization
*/
export type Id3 = string;

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
		id: Id4;
		name: Name3;
		/**
		* billing application associated with this add-on
		*/
		app: { id?: Id5; name?: Name4 };

		/**
		* identity of add-on plan
		*/
		plan?: { id?: Id6; name?: Name5 }
	 };

	/**
	* application that is attached to add-on
	*/
	app?: { id?: Id5; name?: Name4 };
	created_at?: CreatedAt2;
	id?: Id7;
	name?: Name6;
	namespace?: Namespace;
	updated_at?: UpdatedAt2;
	web_url?: WebUrl
}

/**
* unique identifier of add-on
*/
export type Id4 = string;

/**
* globally unique name of the add-on
*/
export type Name3 = string;

/**
* unique identifier of app
*/
export type Id5 = string;

/**
* unique name of app
*/
export type Name4 = string;

/**
* unique identifier of this plan
*/
export type Id6 = string;

/**
* unique name of this plan
*/
export type Name5 = string;

/**
* when add-on attachment was created
*/
export type CreatedAt2 = string;

/**
* unique identifier of this add-on attachment
*/
export type Id7 = string;

/**
* unique name for this add-on attachment to this app
*/
export type Name6 = string;

/**
* attachment namespace
*/
export type Namespace = 
	/**
	* attachment namespace
	*/
	null |

	/**
	* attachment namespace
	*/
	string
;

/**
* when add-on attachment was updated
*/
export type UpdatedAt2 = string;

/**
* URL for logging into web interface of add-on in attached app context
*/
export type WebUrl = 
	/**
	* URL for logging into web interface of add-on in attached app context
	*/
	null |

	/**
	* URL for logging into web interface of add-on in attached app context
	*/
	string
;

/**
* Configuration of an Add-on
*/
export interface HerokuPlatformAPIAddOnConfig { name?: Name7; value?: Value }

/**
* unique name of the config
*/
export type Name7 = string;

/**
* value of the config
*/
export type Value = 
	/**
	* value of the config
	*/
	string |

	/**
	* value of the config
	*/
	null
;

/**
* Add-on Plan Actions are Provider functionality for specific add-on installations
*/
export interface HerokuPlatformAPIAddOnPlanAction {
	id?: Id8;
	label?: Label;
	action?: Action;
	url?: Url;
	requires_owner?: RequiresOwner
}

/**
* a unique identifier
*/
export type Id8 = string;

/**
* the display text shown in Dashboard
*/
export type Label = string;

/**
* identifier of the action to take that is sent via SSO
*/
export type Action = string;

/**
* absolute URL to use instead of an action
*/
export type Url = string;

/**
* if the action requires the user to own the app
*/
export type RequiresOwner = boolean;

/**
* Add-on region capabilities represent the relationship between an Add-on Service and a specific Region. Only Beta and GA add-ons are returned by these endpoints.
*/
export interface HerokuPlatformAPIAddOnRegionCapability {
	id?: Id9;
	supports_private_networking?: SupportsPrivateNetworking;
	addon_service?: HerokuPlatformAPIAddOnService;
	region?: HerokuPlatformAPIRegion
}

/**
* unique identifier of this add-on-region-capability
*/
export type Id9 = string;

/**
* whether the add-on can be installed to a Space
*/
export type SupportsPrivateNetworking = boolean;

/**
* Add-on services represent add-ons that may be provisioned for apps. Endpoints under add-on services can be accessed without authentication.
*/
export interface HerokuPlatformAPIAddOnService {
	cli_plugin_name?: CliPluginName;
	created_at?: CreatedAt3;
	human_name?: HumanName;
	id?: Id10;
	name?: Name8;
	state?: State1;
	supports_multiple_installations?: SupportsMultipleInstallations;
	supports_sharing?: SupportsSharing;
	updated_at?: UpdatedAt3
}

/**
* npm package name of the add-on service's Heroku CLI plugin
*/
export type CliPluginName = 
	/**
	* npm package name of the add-on service's Heroku CLI plugin
	*/
	string |

	/**
	* npm package name of the add-on service's Heroku CLI plugin
	*/
	null
;

/**
* when add-on-service was created
*/
export type CreatedAt3 = string;

/**
* human-readable name of the add-on service provider
*/
export type HumanName = string;

/**
* unique identifier of this add-on-service
*/
export type Id10 = string;

/**
* unique name of this add-on-service
*/
export type Name8 = string;

/**
* release status for add-on service
*/
export type State1 = 'alpha' | 'beta' | 'ga' | 'shutdown';

/**
* whether or not apps can have access to more than one instance of this add-on at the same time
*/
export type SupportsMultipleInstallations = boolean;

/**
* whether or not apps can have access to add-ons billed to a different app
*/
export type SupportsSharing = boolean;

/**
* when add-on-service was updated
*/
export type UpdatedAt3 = string;

/**
* A region represents a geographic location in which your application may run.
*/
export interface HerokuPlatformAPIRegion {
	country?: Country;
	created_at?: CreatedAt4;
	description?: Description1;
	id?: Id11;
	locale?: Locale;
	name?: Name9;
	private_capable?: PrivateCapable;
	provider?: Provider;
	updated_at?: UpdatedAt4
}

/**
* country where the region exists
*/
export type Country = string;

/**
* when region was created
*/
export type CreatedAt4 = string;

/**
* description of region
*/
export type Description1 = string;

/**
* unique identifier of region
*/
export type Id11 = string;

/**
* area in the country where the region exists
*/
export type Locale = string;

/**
* unique name of region
*/
export type Name9 = string;

/**
* whether or not region is available for creating a Private Space
*/
export type PrivateCapable = boolean;

/**
* provider of underlying substrate
*/
export interface Provider {
	/**
	* name of provider
	*/
	name?: string;

	/**
	* region name used by provider
	*/
	region?: string
}

/**
* when region was updated
*/
export type UpdatedAt4 = string;

/**
* Add-ons represent add-ons that have been provisioned and attached to one or more apps.
*/
export interface HerokuPlatformAPIAddOn {
	actions?: Actions;
	/**
	* identity of add-on service
	*/
	addon_service?: { id?: Id10; name?: Name8 };

	/**
	* billing application associated with this add-on
	*/
	app?: { id?: Id5; name?: Name4 };
	config_vars?: ConfigVars;
	created_at?: CreatedAt5;
	id?: Id4;
	name?: Name3;
	/**
	* identity of add-on plan
	*/
	plan?: { id?: Id6; name?: Name5 };
	provider_id?: ProviderId;
	state?: State2;
	updated_at?: UpdatedAt5;
	web_url?: WebUrl1
}

/**
* provider actions for this specific add-on
*/
export type Actions = {  }[];

/**
* config vars exposed to the owning app by this add-on
*/
export type ConfigVars = string[];

/**
* when add-on was created
*/
export type CreatedAt5 = string;

/**
* id of this add-on with its provider
*/
export type ProviderId = string;

/**
* state in the add-on's lifecycle
*/
export type State2 = 'provisioning' | 'provisioned' | 'deprovisioned';

/**
* when add-on was updated
*/
export type UpdatedAt5 = string;

/**
* URL for logging into web interface of add-on (e.g. a dashboard)
*/
export type WebUrl1 = 
	/**
	* URL for logging into web interface of add-on (e.g. a dashboard)
	*/
	null |

	/**
	* URL for logging into web interface of add-on (e.g. a dashboard)
	*/
	string
;

/**
* An app feature represents a Heroku labs capability that can be enabled or disabled for an app on Heroku.
*/
export interface HerokuPlatformAPIAppFeature {
	created_at?: CreatedAt6;
	description?: Description2;
	doc_url?: DocUrl1;
	enabled?: Enabled1;
	id?: Id12;
	name?: Name10;
	state?: State3;
	updated_at?: UpdatedAt6;
	display_name?: DisplayName1;
	feedback_email?: FeedbackEmail1
}

/**
* when app feature was created
*/
export type CreatedAt6 = string;

/**
* description of app feature
*/
export type Description2 = string;

/**
* documentation URL of app feature
*/
export type DocUrl1 = string;

/**
* whether or not app feature has been enabled
*/
export type Enabled1 = boolean;

/**
* unique identifier of app feature
*/
export type Id12 = string;

/**
* unique name of app feature
*/
export type Name10 = string;

/**
* state of app feature
*/
export type State3 = string;

/**
* when app feature was updated
*/
export type UpdatedAt6 = string;

/**
* user readable feature name
*/
export type DisplayName1 = string;

/**
* e-mail to send feedback about the feature
*/
export type FeedbackEmail1 = string;

/**
* App formation set describes the combination of process types with their quantities and sizes as well as application process tier
*/
export interface HerokuPlatformAPIApplicationFormationSet {
	/**
	* a string representation of the formation set
	*/
	description?: string;

	/**
	* application process tier
	*/
	process_tier?: 'production' | 'traditional' | 'free' | 'hobby' | 'private';

	/**
	* app being described by the formation-set
	*/
	app?: { name?: Name4; id?: Id5 };

	/**
	* last time fomation-set was updated
	*/
	updated_at?: string
}

/**
* An app setup represents an app on Heroku that is setup using an environment, addons, and scripts described in an app.json manifest file.
*/
export interface HerokuSetupAPIAppSetup {
	id?: Id13;
	created_at?: CreatedAt7;
	updated_at?: UpdatedAt7;
	status?: Status;
	failure_message?: FailureMessage;
	/**
	* identity of app
	*/
	app?: { id?: Id5; name?: Name4 };

	/**
	* identity and status of build
	*/
	build?: 
		/**
		* identity and status of build
		*/
		null |

		/**
		* identity and status of build
		*/
		{ 
			id?: Id14;
			status?: Status1;
			output_stream_url?: OutputStreamUrl
		 }
	;
	manifest_errors?: ManifestErrors;
	postdeploy?: Postdeploy;
	resolved_success_url?: ResolvedSuccessUrl
}

/**
* unique identifier of app setup
*/
export type Id13 = string;

/**
* when app setup was created
*/
export type CreatedAt7 = string;

/**
* when app setup was updated
*/
export type UpdatedAt7 = string;

/**
* the overall status of app setup
*/
export type Status = 'failed' | 'pending' | 'succeeded';

/**
* reason that app setup has failed
*/
export type FailureMessage = 
	/**
	* reason that app setup has failed
	*/
	string |

	/**
	* reason that app setup has failed
	*/
	null
;

/**
* unique identifier of build
*/
export type Id14 = string;

/**
* status of build
*/
export type Status1 = 'failed' | 'pending' | 'succeeded';

/**
* Build process output will be available from this URL as a stream. The stream is available as either `text/plain` or `text/event-stream`. Clients should be prepared to handle disconnects and can resume the stream by sending a `Range` header (for `text/plain`) or a `Last-Event-Id` header (for `text/event-stream`).
*/
export type OutputStreamUrl = string;

/**
* errors associated with invalid app.json manifest file
*/
export type ManifestErrors = string[];

/**
* result of postdeploy script
*/
export type Postdeploy = 
	/**
	* result of postdeploy script
	*/
	{ 
		/**
		* output of the postdeploy script
		*/
		output?: string;

		/**
		* The exit code of the postdeploy script
		*/
		exit_code?: number
	 } |

	/**
	* result of postdeploy script
	*/
	null
;

/**
* fully qualified success url
*/
export type ResolvedSuccessUrl = 
	/**
	* fully qualified success url
	*/
	string |

	/**
	* fully qualified success url
	*/
	null
;

/**
* An app transfer represents a two party interaction for transferring ownership of an app.
*/
export interface HerokuPlatformAPIAppTransfer {
	/**
	* app involved in the transfer
	*/
	app?: { name?: Name4; id?: Id5 };
	created_at?: CreatedAt8;
	id?: Id15;
	/**
	* identity of the owner of the transfer
	*/
	owner?: { email?: Email; id?: Id1 };

	/**
	* identity of the recipient of the transfer
	*/
	recipient?: { email?: Email; id?: Id1 };
	state?: State4;
	updated_at?: UpdatedAt8
}

/**
* when app transfer was created
*/
export type CreatedAt8 = string;

/**
* unique identifier of app transfer
*/
export type Id15 = string;

/**
* the current state of an app transfer
*/
export type State4 = 'pending' | 'accepted' | 'declined';

/**
* when app transfer was updated
*/
export type UpdatedAt8 = string;

/**
* An app represents the program that you would like to deploy and run on Heroku.
*/
export interface HerokuPlatformAPIApp {
	archived_at?: ArchivedAt;
	buildpack_provided_description?: BuildpackProvidedDescription;
	/**
	* identity of the stack that will be used for new builds
	*/
	build_stack?: { id?: Id16; name?: Name11 };
	created_at?: CreatedAt9;
	git_url?: GitUrl;
	id?: Id5;
	maintenance?: Maintenance;
	name?: Name4;
	/**
	* identity of app owner
	*/
	owner?: { email?: Email; id?: Id1 };

	/**
	* identity of organization
	*/
	organization?: 
		/**
		* identity of organization
		*/
		null |

		/**
		* identity of organization
		*/
		{ id?: Id3; name?: Name1 }
	;

	/**
	* identity of app region
	*/
	region?: { id?: Id11; name?: Name9 };
	released_at?: ReleasedAt;
	repo_size?: RepoSize;
	slug_size?: SlugSize;
	/**
	* identity of space
	*/
	space?: 
		/**
		* identity of space
		*/
		null |

		/**
		* identity of space
		*/
		{ id?: Id17; name?: Name12; shield?: Shield }
	;

	/**
	* identity of app stack
	*/
	stack?: { id?: Id16; name?: Name11 };
	updated_at?: UpdatedAt9;
	web_url?: WebUrl2
}

/**
* when app was archived
*/
export type ArchivedAt = 
	/**
	* when app was archived
	*/
	null |

	/**
	* when app was archived
	*/
	string
;

/**
* description from buildpack of app
*/
export type BuildpackProvidedDescription = 
	/**
	* description from buildpack of app
	*/
	null |

	/**
	* description from buildpack of app
	*/
	string
;

/**
* unique identifier of stack
*/
export type Id16 = string;

/**
* unique name of stack
*/
export type Name11 = string;

/**
* when app was created
*/
export type CreatedAt9 = string;

/**
* git repo URL of app
*/
export type GitUrl = string;

/**
* maintenance status of app
*/
export type Maintenance = boolean;

/**
* when app was released
*/
export type ReleasedAt = 
	/**
	* when app was released
	*/
	null |

	/**
	* when app was released
	*/
	string
;

/**
* git repo size in bytes of app
*/
export type RepoSize = 
	/**
	* git repo size in bytes of app
	*/
	number |

	/**
	* git repo size in bytes of app
	*/
	null
;

/**
* slug size in bytes of app
*/
export type SlugSize = 
	/**
	* slug size in bytes of app
	*/
	number |

	/**
	* slug size in bytes of app
	*/
	null
;

/**
* unique identifier of space
*/
export type Id17 = string;

/**
* unique name of space
*/
export type Name12 = string;

/**
* true if this space has shield enabled
*/
export type Shield = boolean;

/**
* when app was updated
*/
export type UpdatedAt9 = string;

/**
* web URL of app
*/
export type WebUrl2 = string;

/**
* A build result contains the output from a build.
*/
export interface HerokuBuildAPIBuildResult {
	/**
	* identity of build
	*/
	build?: { 
		id?: Id14;
		status?: Status1;
		output_stream_url?: OutputStreamUrl
	 };
	exit_code?: ExitCode;
	/**
	* A list of all the lines of a build's output. This has been replaced by the `output_stream_url` attribute on the build resource.
	*/
	lines?: Line[]
}

/**
* status from the build
*/
export type ExitCode = number;

/**
* a single line of output to STDOUT or STDERR from the build.
*/
export interface Line { stream?: Stream; line?: Line1 }

/**
* The output stream where the line was sent.
*/
export type Stream = 'STDOUT' | 'STDERR';

/**
* A line of output from the build.
*/
export type Line1 = string;

/**
* A build represents the process of transforming a code tarball into a slug
*/
export interface HerokuBuildAPIBuild {
	/**
	* app that the build belongs to
	*/
	app?: { id?: Id5 };
	buildpacks?: Buildpacks;
	created_at?: CreatedAt10;
	id?: Id14;
	output_stream_url?: OutputStreamUrl;
	source_blob?: SourceBlob;
	release?: Release;
	/**
	* slug created by this build
	*/
	slug?: 
		/**
		* slug created by this build
		*/
		{ id?: Id19 } |

		/**
		* slug created by this build
		*/
		null
	;
	status?: Status1;
	updated_at?: UpdatedAt10;
	/**
	* user that started the build
	*/
	user?: { id?: Id1; email?: Email }
}

/**
* buildpacks executed for this build, in order
*/
export type Buildpacks = 
	/**
	* buildpacks executed for this build, in order
	*/
	/**
	* Buildpack to execute in a build
	*/
	{ url?: Url1 }[] |

	/**
	* buildpacks executed for this build, in order
	*/
	null
;

/**
* location of the buildpack for the app. Either a url (unofficial buildpacks) or an internal urn (heroku official buildpacks).
*/
export type Url1 = string;

/**
* when build was created
*/
export type CreatedAt10 = string;

/**
* location of gzipped tarball of source code used to create build
*/
export interface SourceBlob {
	/**
	* an optional checksum of the gzipped tarball for verifying its integrity
	*/
	checksum?: 
		/**
		* an optional checksum of the gzipped tarball for verifying its integrity
		*/
		null |

		/**
		* an optional checksum of the gzipped tarball for verifying its integrity
		*/
		string
	;

	/**
	* URL where gzipped tar archive of source code for build was downloaded.
	*/
	url?: string;

	/**
	* Version of the gzipped tarball.
	*/
	version?: 
		/**
		* Version of the gzipped tarball.
		*/
		string |

		/**
		* Version of the gzipped tarball.
		*/
		null
}

/**
* release resulting from the build
*/
export type Release = 
	/**
	* release resulting from the build
	*/
	null |

	/**
	* release resulting from the build
	*/
	{ id?: Id18 }
;

/**
* unique identifier of release
*/
export type Id18 = string;

/**
* unique identifier of slug
*/
export type Id19 = string;

/**
* when build was updated
*/
export type UpdatedAt10 = string;

/**
* A buildpack installation represents a buildpack that will be run against an app.
*/
export interface HerokuPlatformAPIBuildpackInstallations {
	ordinal?: Ordinal;
	/**
	* buildpack
	*/
	buildpack?: { url?: Url1; name?: Name13 }
}

/**
* determines the order in which the buildpacks will execute
*/
export type Ordinal = number;

/**
* either the shorthand name (heroku official buildpacks) or url (unofficial buildpacks) of the buildpack for the app
*/
export type Name13 = string;

/**
* A collaborator represents an account that has been given access to an app on Heroku.
*/
export interface HerokuPlatformAPICollaborator {
	/**
	* app collaborator belongs to
	*/
	app: { name?: Name4; id?: Id5 };
	created_at: CreatedAt11;
	id: Id20;
	permissions?: HerokuPlatformAPIOrganizationAppPermission[];
	role?: Role;
	updated_at: UpdatedAt11;
	/**
	* identity of collaborated account
	*/
	user: { email?: Email; federated?: Federated; id?: Id1 }
}

/**
* when collaborator was created
*/
export type CreatedAt11 = string;

/**
* unique identifier of collaborator
*/
export type Id20 = string;

/**
* An organization app permission is a behavior that is assigned to a user in an organization app.
*/
export interface HerokuPlatformAPIOrganizationAppPermission { name?: Name14; description?: Description3 }

/**
* The name of the app permission.
*/
export type Name14 = string;

/**
* A description of what the app permission allows.
*/
export type Description3 = string;

/**
* role in the organization
*/
export type Role = 'admin' | 'collaborator' | 'member' | 'owner' | null;

/**
* when collaborator was updated
*/
export type UpdatedAt11 = string;

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
	created_at?: CreatedAt12;
	expires_at?: ExpiresAt;
	id?: Id21;
	title?: Title;
	updated_at?: UpdatedAt12
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
*/
export type CreatedAt12 = string;

/**
* when credit will expire
*/
export type ExpiresAt = string;

/**
* unique identifier of credit
*/
export type Id21 = string;

/**
* a name for credit
*/
export type Title = string;

/**
* when credit was updated
*/
export type UpdatedAt12 = string;

/**
* Domains define what web routes should be routed to an app on Heroku.
*/
export interface HerokuPlatformAPIDomain {
	/**
	* app that owns the domain
	*/
	app?: { name?: Name4; id?: Id5 };
	cname?: Cname;
	created_at?: CreatedAt13;
	hostname?: Hostname;
	id?: Id22;
	kind?: Kind;
	updated_at?: UpdatedAt13;
	status?: Status2
}

/**
* canonical name record, the address to point a domain at
*/
export type Cname = 
	/**
	* canonical name record, the address to point a domain at
	*/
	null |

	/**
	* canonical name record, the address to point a domain at
	*/
	string
;

/**
* when domain was created
*/
export type CreatedAt13 = string;

/**
* full hostname
*/
export type Hostname = string;

/**
* unique identifier of this domain
*/
export type Id22 = string;

/**
* type of domain name
*/
export type Kind = 'heroku' | 'custom';

/**
* when domain was updated
*/
export type UpdatedAt13 = string;

/**
* status of this record's cname
*/
export type Status2 = string;

/**
* Dyno sizes are the values and details of sizes that can be assigned to dynos. This information can also be found at : [https://devcenter.heroku.com/articles/dyno-types](https://devcenter.heroku.com/articles/dyno-types).
*/
export interface HerokuPlatformAPIDynoSize {
	compute?: Compute;
	cost?: Cost;
	dedicated?: Dedicated;
	dyno_units?: DynoUnits;
	id?: Id23;
	memory?: Memory;
	name?: Name15;
	private_space_only?: PrivateSpaceOnly
}

/**
* minimum vCPUs, non-dedicated may get more depending on load
*/
export type Compute = number;

/**
* price information for this dyno size
*/
export type Cost = 
	/**
	* price information for this dyno size
	*/
	null |

	/**
	* price information for this dyno size
	*/
	{  }
;

/**
* whether this dyno will be dedicated to one user
*/
export type Dedicated = boolean;

/**
* unit of consumption for Heroku Enterprise customers
*/
export type DynoUnits = number;

/**
* unique identifier of this dyno size
*/
export type Id23 = string;

/**
* amount of RAM in GB
*/
export type Memory = number;

/**
* the name of this dyno-size
*/
export type Name15 = string;

/**
* whether this dyno can only be provisioned in a private space
*/
export type PrivateSpaceOnly = boolean;

/**
* Dynos encapsulate running processes of an app on Heroku. Detailed information about dyno sizes can be found at: [https://devcenter.heroku.com/articles/dyno-types](https://devcenter.heroku.com/articles/dyno-types).
*/
export interface HerokuPlatformAPIDyno {
	attach_url?: AttachUrl;
	command?: Command;
	created_at?: CreatedAt14;
	id?: Id24;
	name?: Name16;
	/**
	* app release of the dyno
	*/
	release?: { id?: Id18; version?: Version };

	/**
	* app formation belongs to
	*/
	app?: { name?: Name4; id?: Id5 };
	size?: Size;
	state?: State5;
	type?: Type;
	updated_at?: UpdatedAt14
}

/**
* a URL to stream output from for attached processes or null for non-attached processes
*/
export type AttachUrl = 
	/**
	* a URL to stream output from for attached processes or null for non-attached processes
	*/
	string |

	/**
	* a URL to stream output from for attached processes or null for non-attached processes
	*/
	null
;

/**
* command used to start this process
*/
export type Command = string;

/**
* when dyno was created
*/
export type CreatedAt14 = string;

/**
* unique identifier of this dyno
*/
export type Id24 = string;

/**
* the name of this process on this dyno
*/
export type Name16 = string;

/**
* unique version assigned to the release
*/
export type Version = number;

/**
* dyno size (default: "standard-1X")
*/
export type Size = string;

/**
* current status of process (either: crashed, down, idle, starting, or up)
*/
export type State5 = string;

/**
* type of process
*/
export type Type = string;

/**
* when process last changed state
*/
export type UpdatedAt14 = string;

/**
* An event represents an action performed on another API resource.
*/
export interface HerokuPlatformAPIEvent {
	action?: Action1;
	/**
	* user that performed the operation
	*/
	actor?: { email?: Email; id?: Id1 };
	created_at?: CreatedAt15;
	data?: Data;
	id?: Id27;
	/**
	* data fields that were changed during update with previous values
	*/
	previous_data?: {  };
	published_at?: PublishedAt;
	resource?: Resource;
	sequence?: Sequence;
	updated_at?: UpdatedAt19;
	version?: Version1
}

/**
* the operation performed on the resource
*/
export type Action1 = 'create' | 'destroy' | 'update';

/**
* when the event was created
*/
export type CreatedAt15 = string;

/**
* the serialized resource affected by the event
*/
export type Data = 
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

/**
* A failed event represents a failure of an action performed on another API resource.
*/
export interface HerokuPlatformAPIFailedEvent {
	action?: Action2;
	code?: Code;
	error_id?: ErrorId;
	message?: Message;
	method?: Method;
	path?: Path;
	/**
	* The related resource of the failed action.
	*/
	resource?: 
		/**
		* The related resource of the failed action.
		*/
		{ id?: ResourceId; name?: Resource } |

		/**
		* The related resource of the failed action.
		*/
		null
}

/**
* The attempted operation performed on the resource.
*/
export type Action2 = 'create' | 'destroy' | 'update' | 'unknown';

/**
* An HTTP status code.
*/
export type Code = 
	/**
	* An HTTP status code.
	*/
	number |

	/**
	* An HTTP status code.
	*/
	null
;

/**
* ID of error raised.
*/
export type ErrorId = 
	/**
	* ID of error raised.
	*/
	string |

	/**
	* ID of error raised.
	*/
	null
;

/**
* A detailed error message.
*/
export type Message = string;

/**
* The HTTP method type of the failed action.
*/
export type Method = 
	'DELETE' |
	'GET' |
	'HEAD' |
	'OPTIONS' |
	'PATCH' |
	'POST' |
	'PUT'
;

/**
* The path of the attempted operation.
*/
export type Path = string;

/**
* Unique identifier of a resource.
*/
export type ResourceId = string;

/**
* the type of resource affected
*/
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

/**
* The formation of processes that should be maintained for an app. Update the formation to scale processes or change dyno sizes. Available process type names and commands are defined by the `process_types` attribute for the [slug](#slug) currently released on an app.
*/
export interface HerokuPlatformAPIFormation {
	/**
	* app formation belongs to
	*/
	app?: { name?: Name4; id?: Id5 };
	command?: Command1;
	created_at?: CreatedAt16;
	id?: Id25;
	quantity?: Quantity;
	size?: Size1;
	type?: Type1;
	updated_at?: UpdatedAt15
}

/**
* command to use to launch this process
*/
export type Command1 = string;

/**
* when process type was created
*/
export type CreatedAt16 = string;

/**
* unique identifier of this process type
*/
export type Id25 = string;

/**
* number of processes to maintain
*/
export type Quantity = number;

/**
* dyno size (default: "standard-1X")
*/
export type Size1 = string;

/**
* type of process to maintain
*/
export type Type1 = string;

/**
* when dyno type was updated
*/
export type UpdatedAt15 = string;

/**
* An inbound-ruleset is a collection of rules that specify what hosts can or cannot connect to an application.
*/
export interface HerokuPlatformAPIInboundRuleset {
	id?: Id26;
	created_at?: CreatedAt17;
	rules?: Rule[];
	created_by?: Email
}

/**
* unique identifier of an inbound-ruleset
*/
export type Id26 = string;

/**
* when inbound-ruleset was created
*/
export type CreatedAt17 = string;

/**
* the combination of an IP address in CIDR notation and whether to allow or deny it's traffic.
*/
export interface Rule { action: Action3; source: Source }

/**
* states whether the connection is allowed or denied
*/
export type Action3 = 'allow' | 'deny';

/**
* is the request’s source in CIDR notation
*/
export type Source = string;

/**
* Organizations allow you to manage access to a shared group of applications across your development team.
*/
export interface HerokuPlatformAPIOrganization {
	id?: Id3;
	created_at?: CreatedAt18;
	credit_card_collections?: CreditCardCollections;
	default?: Default;
	membership_limit?: MembershipLimit;
	name?: Name1;
	provisioned_licenses?: ProvisionedLicenses;
	role?: Role;
	type?: Type2;
	updated_at?: UpdatedAt16
}

/**
* when the organization was created
*/
export type CreatedAt18 = string;

/**
* whether charges incurred by the org are paid by credit card.
*/
export type CreditCardCollections = boolean;

/**
* whether to use this organization when none is specified
*/
export type Default = boolean;

/**
* upper limit of members allowed in an organization.
*/
export type MembershipLimit = 
	/**
	* upper limit of members allowed in an organization.
	*/
	number |

	/**
	* upper limit of members allowed in an organization.
	*/
	null
;

/**
* whether the org is provisioned licenses by salesforce.
*/
export type ProvisionedLicenses = boolean;

/**
* type of organization.
*/
export type Type2 = 'enterprise' | 'team';

/**
* when the organization was updated
*/
export type UpdatedAt16 = string;

/**
* A release represents a combination of code, config vars and add-ons for an app on Heroku.
*/
export interface HerokuPlatformAPIRelease {
	/**
	* add-on plans installed on the app for this release
	*/
	addon_plan_names?: Name5[];

	/**
	* app involved in the release
	*/
	app?: { name?: Name4; id?: Id5 };
	created_at?: CreatedAt19;
	description?: Description4;
	id?: Id18;
	updated_at?: UpdatedAt17;
	/**
	* slug running in this release
	*/
	slug?: 
		/**
		* slug running in this release
		*/
		{ id?: Id19 } |

		/**
		* slug running in this release
		*/
		null
	;
	status?: Status3;
	/**
	* user that created the release
	*/
	user?: { id?: Id1; email?: Email };
	version?: Version;
	current?: Current
}

/**
* when release was created
*/
export type CreatedAt19 = string;

/**
* description of changes in this release
*/
export type Description4 = string;

/**
* when release was updated
*/
export type UpdatedAt17 = string;

/**
* current status of the release
*/
export type Status3 = 'failed' | 'pending' | 'succeeded';

/**
* indicates this release as being the current one for the app
*/
export type Current = boolean;

/**
* A space is an isolated, highly available, secure app execution environments, running in the modern VPC substrate.
*/
export interface HerokuPlatformAPISpace {
	created_at?: CreatedAt20;
	id?: Id17;
	name?: Name12;
	/**
	* organization that owns this space
	*/
	organization?: { name?: Name1 };

	/**
	* identity of space region
	*/
	region?: { id?: Id11; name?: Name9 };
	shield?: Shield;
	state?: State6;
	updated_at?: UpdatedAt18
}

/**
* when space was created
*/
export type CreatedAt20 = string;

/**
* availability of this space
*/
export type State6 = 'allocating' | 'allocated' | 'deleting';

/**
* when space was updated
*/
export type UpdatedAt18 = string;

/**
* unique identifier of an event
*/
export type Id27 = string;

/**
* when the event was published
*/
export type PublishedAt = 
	/**
	* when the event was published
	*/
	null |

	/**
	* when the event was published
	*/
	string
;

/**
* a numeric string representing the event's sequence
*/
export type Sequence = 
	/**
	* a numeric string representing the event's sequence
	*/
	null |

	/**
	* a numeric string representing the event's sequence
	*/
	string
;

/**
* when the event was updated (same as created)
*/
export type UpdatedAt19 = string;

/**
* the event's API version string
*/
export type Version1 = string;

/**
* Filters are special endpoints to allow for API consumers to specify a subset of resources to consume in order to reduce the number of requests that are performed.  Each filter endpoint endpoint is responsible for determining its supported request format.  The endpoints are over POST in order to handle large request bodies without hitting request uri query length limitations, but the requests themselves are idempotent and will not have side effects.
*/
export interface HerokuPlatformAPIFilters {}

/**
* Identity Providers represent the SAML configuration of an Organization.
*/
export interface HerokuPlatformAPIIdentityProvider {
	certificate?: Certificate;
	created_at?: CreatedAt21;
	entity_id?: EntityId;
	id?: Id2;
	slo_target_url?: SloTargetUrl;
	sso_target_url?: SsoTargetUrl;
	/**
	* organization associated with this identity provider
	*/
	organization?: 
		/**
		* organization associated with this identity provider
		*/
		null |

		/**
		* organization associated with this identity provider
		*/
		{ name?: Name1 }
	;
	updated_at?: UpdatedAt20
}

/**
* raw contents of the public certificate (eg: .crt or .pem file)
*/
export type Certificate = string;

/**
* when provider record was created
*/
export type CreatedAt21 = string;

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
* when the identity provider record was updated
*/
export type UpdatedAt20 = string;

/**
* An invitation represents an invite sent to a user to use the Heroku platform.
*/
export interface HerokuPlatformAPIInvitation {
	verification_required?: VerificationRequired;
	created_at?: CreatedAt22;
	user?: { email?: Email; id?: Id1 }
}

/**
* if the invitation requires verification
*/
export type VerificationRequired = boolean;

/**
* when invitation was created
*/
export type CreatedAt22 = string;

/**
* An invoice address represents the address that should be listed on an invoice.
*/
export interface HerokuVaultAPIInvoiceAddress {
	address_1?: Address1;
	address_2?: Address2;
	city?: City;
	country?: Country1;
	heroku_id?: Identity;
	other?: Other;
	postal_code?: PostalCode;
	state?: State7;
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
export type Country1 = string;

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
export type State7 = string;

/**
* flag to use the invoice address for an account or not
*/
export type UseInvoiceAddress = boolean;

/**
* An invoice is an itemized bill of goods for an account which includes pricing and charges.
*/
export interface HerokuPlatformAPIInvoice {
	charges_total?: ChargesTotal;
	created_at?: CreatedAt23;
	credits_total?: CreditsTotal;
	id?: Id28;
	number?: Number;
	period_end?: PeriodEnd;
	period_start?: PeriodStart;
	state?: State8;
	total?: Total;
	updated_at?: UpdatedAt21
}

/**
* total charges on this invoice
*/
export type ChargesTotal = number;

/**
* when invoice was created
*/
export type CreatedAt23 = string;

/**
* total credits on this invoice
*/
export type CreditsTotal = number;

/**
* unique identifier of this invoice
*/
export type Id28 = string;

/**
* human readable invoice number
*/
export type Number = number;

/**
* the ending date that the invoice covers
*/
export type PeriodEnd = string;

/**
* the starting date that this invoice covers
*/
export type PeriodStart = string;

/**
* payment status for this invoice (pending, successful, failed)
*/
export type State8 = number;

/**
* combined total of charges and credits on this invoice
*/
export type Total = number;

/**
* when invoice was updated
*/
export type UpdatedAt21 = string;

/**
* Keys represent public SSH keys associated with an account and are used to authorize accounts as they are performing git operations.
*/
export interface HerokuPlatformAPIKey {
	comment?: Comment;
	created_at?: CreatedAt24;
	email?: Email1;
	fingerprint?: Fingerprint;
	id?: Id29;
	public_key?: PublicKey;
	updated_at?: UpdatedAt22
}

/**
* comment on the key
*/
export type Comment = string;

/**
* when key was created
*/
export type CreatedAt24 = string;

/**
* deprecated. Please refer to 'comment' instead
*/
export type Email1 = string;

/**
* a unique identifying string based on contents
*/
export type Fingerprint = string;

/**
* unique identifier of this key
*/
export type Id29 = string;

/**
* full public_key as uploaded
*/
export type PublicKey = string;

/**
* when key was updated
*/
export type UpdatedAt22 = string;

/**
* [Log drains](https://devcenter.heroku.com/articles/log-drains) provide a way to forward your Heroku logs to an external syslog server for long-term archiving. This external service must be configured to receive syslog packets from Heroku, whereupon its URL can be added to an app using this API. Some add-ons will add a log drain when they are provisioned to an app. These drains can only be removed by removing the add-on.
*/
export interface HerokuPlatformAPILogDrain {
	addon?: Addon;
	created_at?: CreatedAt25;
	id?: Id30;
	token?: Token;
	updated_at?: UpdatedAt23;
	url?: Url2
}

/**
* add-on that created the drain
*/
export type Addon = 
	/**
	* add-on that created the drain
	*/
	{ id?: Id4; name?: Name3 } |

	/**
	* add-on that created the drain
	*/
	null
;

/**
* when log drain was created
*/
export type CreatedAt25 = string;

/**
* unique identifier of this log drain
*/
export type Id30 = string;

/**
* token associated with the log drain
*/
export type Token = string;

/**
* when log drain was updated
*/
export type UpdatedAt23 = string;

/**
* url associated with the log drain
*/
export type Url2 = string;

/**
* A log session is a reference to the http based log stream for an app.
*/
export interface HerokuPlatformAPILogSession {
	created_at?: CreatedAt26;
	id?: Id31;
	logplex_url?: LogplexUrl;
	updated_at?: UpdatedAt24
}

/**
* when log connection was created
*/
export type CreatedAt26 = string;

/**
* unique identifier of this log session
*/
export type Id31 = string;

/**
* URL for log streaming session
*/
export type LogplexUrl = string;

/**
* when log session was updated
*/
export type UpdatedAt24 = string;

/**
* OAuth authorizations represent clients that a Heroku user has authorized to automate, customize or extend their usage of the platform. For more information please refer to the [Heroku OAuth documentation](https://devcenter.heroku.com/articles/oauth)
*/
export interface HerokuPlatformAPIOAuthAuthorization {
	/**
	* access token for this authorization
	*/
	access_token?: 
		/**
		* access token for this authorization
		*/
		null |

		/**
		* access token for this authorization
		*/
		{ expires_in?: ExpiresIn; id?: Id32; token?: Token1 }
	;

	/**
	* identifier of the client that obtained this authorization, if any
	*/
	client?: 
		/**
		* identifier of the client that obtained this authorization, if any
		*/
		null |

		/**
		* identifier of the client that obtained this authorization, if any
		*/
		{ id?: Id33; name?: Name17; redirect_uri?: RedirectUri }
	;
	created_at?: CreatedAt27;
	/**
	* this authorization's grant
	*/
	grant?: 
		/**
		* this authorization's grant
		*/
		null |

		/**
		* this authorization's grant
		*/
		{ code?: Code1; expires_in?: ExpiresIn1; id?: Id34 }
	;
	id?: Id35;
	/**
	* refresh token for this authorization
	*/
	refresh_token?: 
		/**
		* refresh token for this authorization
		*/
		null |

		/**
		* refresh token for this authorization
		*/
		{ expires_in?: ExpiresIn; id?: Id32; token?: Token1 }
	;
	scope?: Scope;
	updated_at?: UpdatedAt25;
	/**
	* authenticated user associated with this authorization
	*/
	user?: { id?: Id1; email?: Email; full_name?: Name2 }
}

/**
* seconds until OAuth token expires; may be `null` for tokens with indefinite lifetime
*/
export type ExpiresIn = 
	/**
	* seconds until OAuth token expires; may be `null` for tokens with indefinite lifetime
	*/
	null |

	/**
	* seconds until OAuth token expires; may be `null` for tokens with indefinite lifetime
	*/
	number
;

/**
* unique identifier of OAuth token
*/
export type Id32 = string;

/**
* contents of the token to be used for authorization
*/
export type Token1 = string;

/**
* unique identifier of this OAuth client
*/
export type Id33 = string;

/**
* OAuth client name
*/
export type Name17 = string;

/**
* endpoint for redirection after authorization with OAuth client
*/
export type RedirectUri = string;

/**
* when OAuth authorization was created
*/
export type CreatedAt27 = string;

/**
* grant code received from OAuth web application authorization
*/
export type Code1 = string;

/**
* seconds until OAuth grant expires
*/
export type ExpiresIn1 = number;

/**
* unique identifier of OAuth grant
*/
export type Id34 = string;

/**
* unique identifier of OAuth authorization
*/
export type Id35 = string;

/**
* The scope of access OAuth authorization allows
*/
export type Scope = string[];

/**
* when OAuth authorization was updated
*/
export type UpdatedAt25 = string;

/**
* OAuth clients are applications that Heroku users can authorize to automate, customize or extend their usage of the platform. For more information please refer to the [Heroku OAuth documentation](https://devcenter.heroku.com/articles/oauth).
*/
export interface HerokuPlatformAPIOAuthClient {
	created_at?: CreatedAt28;
	id?: Id33;
	ignores_delinquent?: IgnoresDelinquent;
	name?: Name17;
	redirect_uri?: RedirectUri;
	secret?: Secret;
	updated_at?: UpdatedAt26
}

/**
* when OAuth client was created
*/
export type CreatedAt28 = string;

/**
* whether the client is still operable given a delinquent account
*/
export type IgnoresDelinquent = 
	/**
	* whether the client is still operable given a delinquent account
	*/
	boolean |

	/**
	* whether the client is still operable given a delinquent account
	*/
	null
;

/**
* secret used to obtain OAuth authorizations under this client
*/
export type Secret = string;

/**
* when OAuth client was updated
*/
export type UpdatedAt26 = string;

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
	access_token?: { expires_in?: ExpiresIn; id?: Id32; token?: Token1 };

	/**
	* authorization for this set of tokens
	*/
	authorization?: { id?: Id35 };

	/**
	* OAuth client secret used to obtain token
	*/
	client?: 
		/**
		* OAuth client secret used to obtain token
		*/
		null |

		/**
		* OAuth client secret used to obtain token
		*/
		{ secret?: Secret }
	;
	created_at?: CreatedAt29;
	/**
	* grant used on the underlying authorization
	*/
	grant?: { code?: Code1; type?: Type3 };
	id?: Id32;
	/**
	* refresh token for this authorization
	*/
	refresh_token?: { expires_in?: ExpiresIn; id?: Id32; token?: Token1 };

	/**
	* OAuth session using this token
	*/
	session?: { id?: Id32 };
	updated_at?: UpdatedAt27;
	/**
	* Reference to the user associated with this token
	*/
	user?: { id?: Id1 }
}

/**
* when OAuth token was created
*/
export type CreatedAt29 = string;

/**
* type of grant requested, one of `authorization_code` or `refresh_token`
*/
export type Type3 = string;

/**
* when OAuth token was updated
*/
export type UpdatedAt27 = string;

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
	app?: { name?: Name4; id?: Id5 };
	created_at?: CreatedAt11;
	id?: Id20;
	role?: Role;
	updated_at?: UpdatedAt11;
	/**
	* identity of collaborated account
	*/
	user?: { email?: Email; federated?: Federated; id?: Id1 }
}

/**
* An organization app encapsulates the organization specific functionality of Heroku apps.
*/
export interface HerokuPlatformAPIOrganizationApp {
	archived_at?: ArchivedAt;
	buildpack_provided_description?: BuildpackProvidedDescription;
	created_at?: CreatedAt9;
	git_url?: GitUrl;
	id?: Id5;
	joined?: Joined;
	locked?: Locked;
	maintenance?: Maintenance;
	name?: Name4;
	/**
	* organization that owns this app
	*/
	organization?: 
		/**
		* organization that owns this app
		*/
		null |

		/**
		* organization that owns this app
		*/
		{ name?: Name1 }
	;

	/**
	* identity of app owner
	*/
	owner?: 
		/**
		* identity of app owner
		*/
		null |

		/**
		* identity of app owner
		*/
		{ email?: Email; id?: Id1 }
	;

	/**
	* identity of app region
	*/
	region?: { id?: Id11; name?: Name9 };
	released_at?: ReleasedAt;
	repo_size?: RepoSize;
	slug_size?: SlugSize;
	/**
	* identity of space
	*/
	space?: 
		/**
		* identity of space
		*/
		null |

		/**
		* identity of space
		*/
		{ id?: Id17; name?: Name12 }
	;

	/**
	* identity of app stack
	*/
	stack?: { id?: Id16; name?: Name11 };
	updated_at?: UpdatedAt9;
	web_url?: WebUrl2
}

/**
* is the current member a collaborator on this app.
*/
export type Joined = boolean;

/**
* are other organization members forbidden from joining this app.
*/
export type Locked = boolean;

/**
* An organization feature represents a feature enabled on an organization account.
*/
export interface HerokuPlatformAPIOrganizationFeature {
	created_at?: CreatedAt30;
	description?: Description5;
	doc_url?: DocUrl2;
	enabled?: Enabled2;
	id?: Id36;
	name?: Name18;
	state?: State9;
	updated_at?: UpdatedAt28;
	display_name?: DisplayName2;
	feedback_email?: FeedbackEmail2
}

/**
* when organization feature was created
*/
export type CreatedAt30 = string;

/**
* description of organization feature
*/
export type Description5 = string;

/**
* documentation URL of organization feature
*/
export type DocUrl2 = string;

/**
* whether or not organization feature has been enabled
*/
export type Enabled2 = boolean;

/**
* unique identifier of organization feature
*/
export type Id36 = string;

/**
* unique name of organization feature
*/
export type Name18 = string;

/**
* state of organization feature
*/
export type State9 = string;

/**
* when organization feature was updated
*/
export type UpdatedAt28 = string;

/**
* user readable feature name
*/
export type DisplayName2 = string;

/**
* e-mail to send feedback about the feature
*/
export type FeedbackEmail2 = string;

/**
* An organization invitation represents an invite to an organization.
*/
export interface HerokuPlatformAPIOrganizationInvitation {
	created_at?: CreatedAt31;
	id?: Id37;
	invited_by?: { email?: Email; id?: Id1; name?: Name2 };
	organization?: { id?: Id3; name?: Name1 };
	role?: Role;
	updated_at?: UpdatedAt29;
	user?: { email?: Email; id?: Id1; name?: Name2 }
}

/**
* when invitation was created
*/
export type CreatedAt31 = string;

/**
* Unique identifier of an invitation
*/
export type Id37 = string;

/**
* when invitation was updated
*/
export type UpdatedAt29 = string;

/**
* An organization invoice is an itemized bill of goods for an organization which includes pricing and charges.
*/
export interface HerokuPlatformAPIOrganizationInvoice {
	addons_total?: AddonsTotal;
	database_total?: DatabaseTotal;
	charges_total?: ChargesTotal1;
	created_at?: CreatedAt32;
	credits_total?: CreditsTotal1;
	dyno_units?: DynoUnits1;
	id?: Id38;
	number?: Number1;
	payment_status?: PaymentStatus;
	period_end?: PeriodEnd1;
	period_start?: PeriodStart1;
	platform_total?: PlatformTotal;
	state?: State10;
	total?: Total1;
	updated_at?: UpdatedAt30;
	weighted_dyno_hours?: WeightedDynoHours
}

/**
* total add-ons charges in on this invoice
*/
export type AddonsTotal = number;

/**
* total database charges on this invoice
*/
export type DatabaseTotal = number;

/**
* total charges on this invoice
*/
export type ChargesTotal1 = number;

/**
* when invoice was created
*/
export type CreatedAt32 = string;

/**
* total credits on this invoice
*/
export type CreditsTotal1 = number;

/**
* The total amount of dyno units consumed across dyno types.
*/
export type DynoUnits1 = number;

/**
* unique identifier of this invoice
*/
export type Id38 = string;

/**
* human readable invoice number
*/
export type Number1 = number;

/**
* Status of the invoice payment.
*/
export type PaymentStatus = string;

/**
* the ending date that the invoice covers
*/
export type PeriodEnd1 = string;

/**
* the starting date that this invoice covers
*/
export type PeriodStart1 = string;

/**
* total platform charges on this invoice
*/
export type PlatformTotal = number;

/**
* payment status for this invoice (pending, successful, failed)
*/
export type State10 = number;

/**
* combined total of charges and credits on this invoice
*/
export type Total1 = number;

/**
* when invoice was updated
*/
export type UpdatedAt30 = string;

/**
* The total amount of hours consumed across dyno types.
*/
export type WeightedDynoHours = number;

/**
* An organization member is an individual with access to an organization.
*/
export interface HerokuPlatformAPIOrganizationMember {
	created_at: CreatedAt33;
	email: Email2;
	federated: Federated1;
	id?: Id39;
	role?: Role;
	two_factor_authentication?: TwoFactorAuthentication1;
	updated_at: UpdatedAt31;
	/**
	* user information for the membership
	*/
	user?: { email?: Email; id?: Id1; name?: Name2 }
}

/**
* when the membership record was created
*/
export type CreatedAt33 = string;

/**
* email address of the organization member
*/
export type Email2 = string;

/**
* whether the user is federated and belongs to an Identity Provider
*/
export type Federated1 = boolean;

/**
* unique identifier of organization member
*/
export type Id39 = string;

/**
* whether the Enterprise organization member has two factor authentication enabled
*/
export type TwoFactorAuthentication1 = boolean;

/**
* when the membership record was updated
*/
export type UpdatedAt31 = string;

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
export type WhitelistingEnabled = 
	/**
	* Whether whitelisting rules should be applied to add-on installations
	*/
	boolean |

	/**
	* Whether whitelisting rules should be applied to add-on installations
	*/
	null
;

/**
* An outbound-ruleset is a collection of rules that specify what hosts Dynos are allowed to communicate with.
*/
export interface HerokuPlatformAPIOutboundRuleset {
	id?: Id40;
	created_at?: CreatedAt34;
	rules?: Rule1[];
	created_by?: Email
}

/**
* unique identifier of an outbound-ruleset
*/
export type Id40 = string;

/**
* when outbound-ruleset was created
*/
export type CreatedAt34 = string;

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
export interface HerokuPlatformAPIPasswordReset { created_at?: CreatedAt35; user?: { email?: Email; id?: Id1 } }

/**
* when password reset was created
*/
export type CreatedAt35 = string;

/**
* Information about an app's coupling to a pipeline
*/
export interface HerokuPlatformAPIPipelineCoupling {
	/**
	* app involved in the pipeline coupling
	*/
	app?: { id?: Id5 };
	created_at?: CreatedAt36;
	id?: Id41;
	/**
	* pipeline involved in the coupling
	*/
	pipeline?: { id?: Id42 };
	stage?: Stage;
	updated_at?: UpdatedAt32
}

/**
* when pipeline coupling was created
*/
export type CreatedAt36 = string;

/**
* unique identifier of pipeline coupling
*/
export type Id41 = string;

/**
* unique identifier of pipeline
*/
export type Id42 = string;

/**
* target pipeline stage
*/
export type Stage = 'test' | 'review' | 'development' | 'staging' | 'production';

/**
* when pipeline coupling was updated
*/
export type UpdatedAt32 = string;

/**
* Promotion targets represent an individual app being promoted to
*/
export interface HerokuPlatformAPIPipelinePromotionTarget {
	/**
	* the app which was promoted to
	*/
	app?: { id?: Id5 };
	error_message?: ErrorMessage;
	id?: Id43;
	/**
	* the promotion which the target belongs to
	*/
	pipeline_promotion?: { id?: Id44 };

	/**
	* the release which was created on the target app
	*/
	release?: 
		/**
		* the release which was created on the target app
		*/
		{ id?: Id18 } |

		/**
		* the release which was created on the target app
		*/
		null
	;
	status?: Status4
}

/**
* an error message for why the promotion failed
*/
export type ErrorMessage = 
	/**
	* an error message for why the promotion failed
	*/
	null |

	/**
	* an error message for why the promotion failed
	*/
	string
;

/**
* unique identifier of promotion target
*/
export type Id43 = string;

/**
* unique identifier of promotion
*/
export type Id44 = string;

/**
* status of promotion
*/
export type Status4 = 'pending' | 'succeeded' | 'failed';

/**
* Promotions allow you to move code from an app in a pipeline to all targets
*/
export interface HerokuPlatformAPIPipelinePromotion {
	created_at?: CreatedAt37;
	id?: Id44;
	/**
	* the pipeline which the promotion belongs to
	*/
	pipeline?: { id?: Id42 };

	/**
	* the app being promoted from
	*/
	source?: { 
		/**
		* the app which was promoted from
		*/
		app?: { id?: Id5 };

		/**
		* the release used to promoted from
		*/
		release?: { id?: Id18 }
	 };
	status?: Status5;
	updated_at?: UpdatedAt33
}

/**
* when promotion was created
*/
export type CreatedAt37 = string;

/**
* status of promotion
*/
export type Status5 = 'pending' | 'completed';

/**
* when promotion was updated
*/
export type UpdatedAt33 = 
	/**
	* when promotion was updated
	*/
	string |

	/**
	* when promotion was updated
	*/
	null
;

/**
* A pipeline allows grouping of apps into different stages.
*/
export interface HerokuPlatformAPIPipeline {
	created_at?: CreatedAt38;
	id?: Id42;
	name?: Name19;
	updated_at?: UpdatedAt34
}

/**
* when pipeline was created
*/
export type CreatedAt38 = string;

/**
* name of pipeline
*/
export type Name19 = string;

/**
* when pipeline was updated
*/
export type UpdatedAt34 = string;

/**
* Plans represent different configurations of add-ons that may be added to apps. Endpoints under add-on services can be accessed without authentication.
*/
export interface HerokuPlatformAPIPlan {
	/**
	* identity of add-on service
	*/
	addon_service?: { id?: Id10; name?: Name8 };
	created_at?: CreatedAt39;
	compliance?: Compliance;
	default?: Default1;
	description?: Description6;
	human_name?: HumanName1;
	id?: Id6;
	installable_inside_private_network?: InstallableInsidePrivateNetwork;
	installable_outside_private_network?: InstallableOutsidePrivateNetwork;
	name?: Name5;
	/**
	* price
	*/
	price?: { cents?: Cents; unit?: Unit };
	space_default?: SpaceDefault;
	state?: State11;
	updated_at?: UpdatedAt35;
	visible?: Visible
}

/**
* when plan was created
*/
export type CreatedAt39 = string;

/**
* the compliance regimes applied to an add-on plan
*/
export type Compliance = 
	/**
	* the compliance regimes applied to an add-on plan
	*/
	null |

	/**
	* the compliance regimes applied to an add-on plan
	*/
	Regime[]
;

/**
* compliance requirements an add-on plan must adhere to
*/
export type Regime = 'HIPAA' | 'PCI';

/**
* whether this plan is the default for its add-on service
*/
export type Default1 = boolean;

/**
* description of plan
*/
export type Description6 = string;

/**
* human readable name of the add-on plan
*/
export type HumanName1 = string;

/**
* whether this plan is installable to a Private Spaces app
*/
export type InstallableInsidePrivateNetwork = boolean;

/**
* whether this plan is installable to a Common Runtime app
*/
export type InstallableOutsidePrivateNetwork = boolean;

/**
* price in cents per unit of plan
*/
export type Cents = number;

/**
* unit of price for plan
*/
export type Unit = string;

/**
* whether this plan is the default for apps in Private Spaces
*/
export type SpaceDefault = boolean;

/**
* release status for plan
*/
export type State11 = string;

/**
* when plan was updated
*/
export type UpdatedAt35 = string;

/**
* whether this plan is publicly visible
*/
export type Visible = boolean;

/**
* Rate Limit represents the number of request tokens each account holds. Requests to this endpoint do not count towards the rate limit.
*/
export interface HerokuPlatformAPIRateLimit { remaining?: Remaining }

/**
* allowed requests remaining in current interval
*/
export type Remaining = number;

/**
* A slug is a snapshot of your application code that is ready to run on the platform.
*/
export interface HerokuPlatformAPISlug {
	/**
	* pointer to the url where clients can fetch or store the actual release binary
	*/
	blob?: { method?: Method1; url?: Url3 };
	buildpack_provided_description?: BuildpackProvidedDescription1;
	checksum?: Checksum;
	commit?: Commit;
	commit_description?: CommitDescription;
	created_at?: CreatedAt40;
	id?: Id19;
	process_types?: ProcessTypes;
	size?: Size2;
	/**
	* identity of slug stack
	*/
	stack?: { id?: Id16; name?: Name11 };
	updated_at?: UpdatedAt36
}

/**
* method to be used to interact with the slug blob
*/
export type Method1 = string;

/**
* URL to interact with the slug blob
*/
export type Url3 = string;

/**
* description from buildpack of slug
*/
export type BuildpackProvidedDescription1 = 
	/**
	* description from buildpack of slug
	*/
	null |

	/**
	* description from buildpack of slug
	*/
	string
;

/**
* an optional checksum of the slug for verifying its integrity
*/
export type Checksum = 
	/**
	* an optional checksum of the slug for verifying its integrity
	*/
	null |

	/**
	* an optional checksum of the slug for verifying its integrity
	*/
	string
;

/**
* identification of the code with your version control system (eg: SHA of the git HEAD)
*/
export type Commit = 
	/**
	* identification of the code with your version control system (eg: SHA of the git HEAD)
	*/
	null |

	/**
	* identification of the code with your version control system (eg: SHA of the git HEAD)
	*/
	string
;

/**
* an optional description of the provided commit
*/
export type CommitDescription = 
	/**
	* an optional description of the provided commit
	*/
	null |

	/**
	* an optional description of the provided commit
	*/
	string
;

/**
* when slug was created
*/
export type CreatedAt40 = string;

/**
* hash mapping process type names to their respective command
*/
export type ProcessTypes = Record<string, string>;

/**
* size of slug, in bytes
*/
export type Size2 = 
	/**
	* size of slug, in bytes
	*/
	number |

	/**
	* size of slug, in bytes
	*/
	null
;

/**
* when slug was updated
*/
export type UpdatedAt36 = string;

/**
* SMS numbers are used for recovery on accounts with two-factor authentication enabled.
*/
export interface HerokuPlatformAPISMSNumber { sms_number?: SmsNumber }

/**
* SNI Endpoint is a public address serving a custom SSL cert for HTTPS traffic, using the SNI TLS extension, to a Heroku app.
*/
export interface HerokuPlatformAPISNIEndpoint {
	certificate_chain?: CertificateChain;
	cname?: Cname1;
	created_at?: CreatedAt41;
	id?: Id45;
	name?: Name20;
	updated_at?: UpdatedAt37
}

/**
* raw contents of the public certificate chain (eg: .crt or .pem file)
*/
export type CertificateChain = string;

/**
* deprecated; refer to GET /apps/:id/domains for valid CNAMEs for this app
*/
export type Cname1 = string;

/**
* when endpoint was created
*/
export type CreatedAt41 = string;

/**
* unique identifier of this SNI endpoint
*/
export type Id45 = string;

/**
* unique name for SNI endpoint
*/
export type Name20 = string;

/**
* when SNI endpoint was updated
*/
export type UpdatedAt37 = string;

/**
* A source is a location for uploading and downloading an application's source code.
*/
export interface HerokuPlatformAPISource {
	/**
	* pointer to the URL where clients can fetch or store the source
	*/
	source_blob?: { get_url?: GetUrl; put_url?: PutUrl }
}

/**
* URL to download the source
*/
export type GetUrl = string;

/**
* URL to upload the source
*/
export type PutUrl = string;

/**
* Space access represents the permissions a particular user has on a particular space.
*/
export interface HerokuPlatformAPISpaceAccess {
	/**
	* space user belongs to
	*/
	space?: { name?: Name4; id?: Id5 };
	created_at?: CreatedAt20;
	id?: Id17;
	/**
	* user space permissions
	*/
	permissions?: { description?: string; name?: string }[];
	updated_at?: UpdatedAt18;
	/**
	* identity of user account
	*/
	user?: { email?: Email; id?: Id1 }
}

/**
* Network address translation (NAT) for stable outbound IP addresses from a space
*/
export interface HerokuPlatformAPISpaceNetworkAddressTranslation {
	created_at?: CreatedAt42;
	sources?: Sources;
	state?: State12;
	updated_at?: UpdatedAt38
}

/**
* when network address translation for a space was created
*/
export type CreatedAt42 = string;

/**
* potential IPs from which outbound network traffic will originate
*/
export type Sources = IpV4_address[];

export type IpV4_address = string;

/**
* availability of network address translation for a space
*/
export type State12 = 'disabled' | 'updating' | 'enabled';

/**
* when network address translation for a space was updated
*/
export type UpdatedAt38 = string;

/**
* [SSL Endpoint](https://devcenter.heroku.com/articles/ssl-endpoint) is a public address serving custom SSL cert for HTTPS traffic to a Heroku app. Note that an app must have the `ssl:endpoint` add-on installed before it can provision an SSL Endpoint using these APIs.
*/
export interface HerokuPlatformAPISSLEndpoint {
	/**
	* application associated with this ssl-endpoint
	*/
	app?: { id?: Id5; name?: Name4 };
	certificate_chain?: CertificateChain1;
	cname?: Cname2;
	created_at?: CreatedAt43;
	id?: Id46;
	name?: Name21;
	updated_at?: UpdatedAt39
}

/**
* raw contents of the public certificate chain (eg: .crt or .pem file)
*/
export type CertificateChain1 = string;

/**
* canonical name record, the address to point a domain at
*/
export type Cname2 = string;

/**
* when endpoint was created
*/
export type CreatedAt43 = string;

/**
* unique identifier of this SSL endpoint
*/
export type Id46 = string;

/**
* unique name for SSL endpoint
*/
export type Name21 = string;

/**
* when endpoint was updated
*/
export type UpdatedAt39 = string;

/**
* Stacks are the different application execution environments available in the Heroku platform.
*/
export interface HerokuPlatformAPIStack {
	created_at?: CreatedAt44;
	id?: Id16;
	name?: Name11;
	state?: State13;
	updated_at?: UpdatedAt40
}

/**
* when stack was introduced
*/
export type CreatedAt44 = string;

/**
* availability of this stack: beta, deprecated or public
*/
export type State13 = string;

/**
* when stack was last modified
*/
export type UpdatedAt40 = string;

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
export type Timezone = 
	/**
	* User's default timezone
	*/
	string |

	/**
	* User's default timezone
	*/
	null
;

/**
* User's default organization
*/
export type DefaultOrganization = 
	/**
	* User's default organization
	*/
	string |

	/**
	* User's default organization
	*/
	null
;

/**
* Whether the user has dismissed the GitHub link banner
*/
export type DismissedGithubBanner = 
	/**
	* Whether the user has dismissed the GitHub link banner
	*/
	boolean |

	/**
	* Whether the user has dismissed the GitHub link banner
	*/
	null
;

/**
* Whether the user has dismissed the getting started banner
*/
export type DismissedGettingStarted = 
	/**
	* Whether the user has dismissed the getting started banner
	*/
	boolean |

	/**
	* Whether the user has dismissed the getting started banner
	*/
	null
;

/**
* Whether the user has dismissed the Organization Access Controls banner
*/
export type DismissedOrgAccessControls = 
	/**
	* Whether the user has dismissed the Organization Access Controls banner
	*/
	boolean |

	/**
	* Whether the user has dismissed the Organization Access Controls banner
	*/
	null
;

/**
* Whether the user has dismissed the Organization Wizard
*/
export type DismissedOrgWizardNotification = 
	/**
	* Whether the user has dismissed the Organization Wizard
	*/
	boolean |

	/**
	* Whether the user has dismissed the Organization Wizard
	*/
	null
;

/**
* Whether the user has dismissed the Pipelines banner
*/
export type DismissedPipelinesBanner = 
	/**
	* Whether the user has dismissed the Pipelines banner
	*/
	boolean |

	/**
	* Whether the user has dismissed the Pipelines banner
	*/
	null
;

/**
* Whether the user has dismissed the GitHub banner on a pipeline overview
*/
export type DismissedPipelinesGithubBanner = 
	/**
	* Whether the user has dismissed the GitHub banner on a pipeline overview
	*/
	boolean |

	/**
	* Whether the user has dismissed the GitHub banner on a pipeline overview
	*/
	null
;

/**
* Which pipeline uuids the user has dismissed the GitHub banner for
*/
export type DismissedPipelinesGithubBanners = 
	/**
	* Which pipeline uuids the user has dismissed the GitHub banner for
	*/
	null |

	/**
	* Which pipeline uuids the user has dismissed the GitHub banner for
	*/
	Id42[]
;

/**
* Whether the user has dismissed the 2FA SMS banner
*/
export type DismissedSmsBanner = 
	/**
	* Whether the user has dismissed the 2FA SMS banner
	*/
	boolean |

	/**
	* Whether the user has dismissed the 2FA SMS banner
	*/
	null
;

/**
* Entities that have been whitelisted to be used by an Organization
*/
export interface HerokuPlatformAPIWhitelistedEntity {
	added_at?: AddedAt;
	added_by?: AddedBy;
	addon_service?: AddonService;
	id?: Id48
}

/**
* when the add-on service was whitelisted
*/
export type AddedAt = string;

/**
* the user which whitelisted the Add-on Service
*/
export interface AddedBy { email?: Email3; id?: Id47 }

/**
* unique email address of account
*/
export type Email3 = string;

/**
* unique identifier of an account
*/
export type Id47 = string;

/**
* the Add-on Service whitelisted for use
*/
export interface AddonService { id?: Id10; name?: Name8; human_name?: HumanName }

/**
* unique identifier for this whitelisting entity
*/
export type Id48 = string;

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