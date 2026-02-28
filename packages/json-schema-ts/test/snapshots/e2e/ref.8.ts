/*Butler_API_Entities_UserPrivate model*/ export type Ref8 = { 
	id?: string;
	login?: string;
	name?: string;
	email?: string;
	avatar_url?: string;
	given_name?: string;
	family_name?: string;
	picture?: string;
	locale?: string;
	supporter?: string;
	created_at?: string;
	updated_at?: string;
	access_token?: string;
	role?: string;
	/*Butler_API_Entities_Project model*/ projects?: { 
		slug?: string;
		owner?: string;
		parent_project?: NoName;
		/*Project Name*/ name?: string;
		/*Project Description*/ description?: string;
		/*Repository*/ repository_id?: string;
		/*Code Repository ID*/ code_repository_id?: string;
		created_at?: string;
		updated_at?: string
	 }
 };

export type NoName = { 
	slug?: string;
	owner?: string;
	parent_project?: NoName;
	/*Project Name*/ name?: string;
	/*Project Description*/ description?: string;
	/*Repository*/ repository_id?: string;
	/*Code Repository ID*/ code_repository_id?: string;
	created_at?: string;
	updated_at?: string
 };