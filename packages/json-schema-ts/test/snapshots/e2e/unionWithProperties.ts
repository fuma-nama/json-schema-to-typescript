export type UnionWithProperties = 
	{ obj_type: 'Foo'; foo_type?: string } |
	{ 
		obj_type: 'Bar';
		bar_type?: string;
		team: string;
		health: number
	 }
;