export type UnionWithProperties = 
	{ obj_type: 'Foo'; foo_type?: string } |
	{ 
		obj_type: 'Bar';
		bar_type?: string;
		team: string;
		/**
		* @format `uint`
		* @minimum `0`
		*/
		health: number
	 }
;