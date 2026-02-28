/*This is version 1.03 of the JSON-stat 2.0 Schema (2016-05-04)*/ export type RealWorldJsonStat = 
	{ 
		class: 'dataset';
		version: Version;
		href?: Href;
		label?: Label;
		note?: Note;
		link?: Link;
		updated?: Updated;
		source?: Source;
		error?: Error;
		extension?: Extension;
		id: Note;
		size: number[];
		role?: { time?: Note; geo?: Note; metric?: Note };
		dimension: Record<string, { 
			href?: Href;
			label?: Label;
			note?: Note;
			link?: Link;
			extension?: Extension;
			category: Category
		 }>;

		value: 
			number | null | string[] |
			Record<string, number | null | string>
		;
		status?: string | string[] | Record<string, string>
	 } |

	{ 
		class: 'dimension';
		version: Version;
		href?: Href;
		label?: Label;
		note?: Note;
		link?: Link;
		updated?: Updated;
		source?: Source;
		error?: Error;
		extension?: Extension;
		category: Category
	 } |

	{ 
		class: 'collection';
		version: Version;
		href?: Href;
		label?: Label;
		note?: Note;
		link: { 
			item?: { 
				type?: string;
				class?: 'dataset' | 'collection' | 'dimension';
				href?: Href;
				label?: Label;
				note?: Note;
				link?: Link;
				updated?: Updated;
				source?: Source;
				extension?: Extension;
				category?: Category;
				id?: Note;
				size?: number[];
				role?: { time?: Note; geo?: Note; metric?: Note };
				dimension?: Record<string, { 
					href?: Href;
					label?: Label;
					note?: Note;
					link?: Link;
					extension?: Extension;
					category: Category
				 }>;

				value?: 
					number | null | string[] |
					Record<string, number | null | string>
				;
				status?: string | string[] | Record<string, string>
			 }[]
		 };
		updated?: Updated;
		source?: Source;
		error?: Error;
		extension?: Extension
	 }
;

export type Href = string;
export type Label = string;
export type Note = string[];
export type Link = Link;
export type Extension = {  };

export type Category = { 
	index?: Note | Record<string, number>;
	label?: Record<string, string>;
	note?: Record<string, Note>;
	unit?: Record<string, { label?: Label; decimals?: number; position?: 'start' | 'end' }>;
	coordinates?: Record<string, [number?, number?]>;
	child?: Record<string, Note>
 };

export type Updated = string | string;
export type Source = string;
export type Version = '2.0';
export type Error = any[];