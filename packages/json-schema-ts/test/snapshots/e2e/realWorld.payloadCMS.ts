export type RealWorldPayloadCMS = unknown;

export type MainMenu = { 
	items?: { 
		type?: 'link' | 'subMenu';
		label: string;
		subMenu?: { 
			column1?: 
				{ 
					appearance?: 'primary' | 'secondary' | 'arrow';
					link?: { 
						type?: 'reference' | 'custom';
						label: string;
						reference: 
							{ value: string | Page; relationTo: 'pages' } |
							{ value: string | Post; relationTo: 'posts' } |
							{ value: string | Housing; relationTo: 'housing' }
						;
						url: string
					 };
					id?: string;
					blockName?: string;
					blockType: 'menuLink'
				 } |

				{ 
					content: string;
					id?: string;
					blockName?: string;
					blockType: 'menuDescription'
				 } |

				{ 
					media: string | Media;
					headline: string;
					link?: { 
						type?: 'reference' | 'custom';
						reference: 
							{ value: string | Page; relationTo: 'pages' } |
							{ value: string | Post; relationTo: 'posts' } |
							{ value: string | Housing; relationTo: 'housing' }
						;
						url: string
					 };
					id?: string;
					blockName?: string;
					blockType: 'menuFeature'
				 }
			[];
			enableColumn2?: boolean;
			column2?: 
				{ 
					appearance?: 'primary' | 'secondary' | 'arrow';
					link?: { 
						type?: 'reference' | 'custom';
						label: string;
						reference: 
							{ value: string | Page; relationTo: 'pages' } |
							{ value: string | Post; relationTo: 'posts' } |
							{ value: string | Housing; relationTo: 'housing' }
						;
						url: string
					 };
					id?: string;
					blockName?: string;
					blockType: 'menuLink'
				 } |

				{ 
					content: string;
					id?: string;
					blockName?: string;
					blockType: 'menuDescription'
				 } |

				{ 
					media: string | Media;
					headline: string;
					link?: { 
						type?: 'reference' | 'custom';
						reference: 
							{ value: string | Page; relationTo: 'pages' } |
							{ value: string | Post; relationTo: 'posts' } |
							{ value: string | Housing; relationTo: 'housing' }
						;
						url: string
					 };
					id?: string;
					blockName?: string;
					blockType: 'menuFeature'
				 }
			[]
		 };

		link?: { 
			type?: 'reference' | 'custom';
			reference: 
				{ value: string | Page; relationTo: 'pages' } |
				{ value: string | Post; relationTo: 'posts' } |
				{ value: string | Housing; relationTo: 'housing' }
			;
			url: string
		 };
		id?: string
	 }[];

	secondaryItems?: { 
		link?: { 
			type?: 'reference' | 'custom';
			label: string;
			reference: 
				{ value: string | Page; relationTo: 'pages' } |
				{ value: string | Post; relationTo: 'posts' } |
				{ value: string | Housing; relationTo: 'housing' }
			;
			url: string
		 };
		id?: string
	 }[]
 };

export type Page = Page;
export type Post = Post;
export type Housing = Housing;
export type Media = Media;

export type Form = { 
	title: string;
	emailTo?: string;
	successMessage?: {  }[];
	redirect?: string;
	submitButtonLabel?: string;
	fields?: 
		{ 
			name: string;
			label: string;
			width?: number;
			defaultValue?: string;
			required?: boolean;
			id?: string;
			blockName?: string;
			blockType: 'text'
		 } |

		{ 
			name: string;
			label: string;
			width?: number;
			defaultValue?: string;
			options?: { label: string; value: string; id?: string }[];
			required?: boolean;
			id?: string;
			blockName?: string;
			blockType: 'select'
		 } |

		{ 
			name: string;
			label: string;
			width?: number;
			required?: boolean;
			id?: string;
			blockName?: string;
			blockType: 'email'
		 } |

		{ 
			name: string;
			label: string;
			width?: number;
			required?: boolean;
			id?: string;
			blockName?: string;
			blockType: 'state'
		 } |

		{ 
			name: string;
			label: string;
			width?: number;
			required?: boolean;
			id?: string;
			blockName?: string;
			blockType: 'country'
		 } |

		{ 
			name: string;
			label: string;
			width?: number;
			required?: boolean;
			defaultValue?: boolean;
			id?: string;
			blockName?: string;
			blockType: 'checkbox'
		 } |

		{ 
			message?: {  }[];
			id?: string;
			blockName?: string;
			blockType: 'message'
		 }
	[]
 };

export type Location = { 
	name: string;
	address?: { 
		line1?: string;
		line2?: string;
		city?: string;
		state?: 
			'None' |
			'Alabama' |
			'Alaska' |
			'Arizona' |
			'Arkansas' |
			'California' |
			'Colorado' |
			'Connecticut' |
			'Delaware' |
			'Florida' |
			'Georgia' |
			'Hawaii' |
			'Idaho' |
			'Illinois' |
			'Indiana' |
			'Iowa' |
			'Kansas' |
			'Kentucky' |
			'Louisiana' |
			'Maine' |
			'Maryland' |
			'Massachusetts' |
			'Michigan' |
			'Minnesota' |
			'Mississippi' |
			'Missouri' |
			'Montana' |
			'Nebraska' |
			'Nevada' |
			'New Hampshire' |
			'New Jersey' |
			'New Mexico' |
			'New York' |
			'North Carolina' |
			'North Dakota' |
			'Ohio' |
			'Oklahoma' |
			'Oregon' |
			'Pennsylvania' |
			'Rhode Island' |
			'South Carolina' |
			'South Dakota' |
			'Tennessee' |
			'Texas' |
			'Utah' |
			'Vermont' |
			'Virginia' |
			'Washington' |
			'West Virginia' |
			'Wisconsin' |
			'Wyoming'
		;
		zip?: string;
		coords?: { lat?: number; lng?: number }
	 };

	contacts?: { 
		type?: 'mailto' | 'tel' | 'fax';
		label?: string;
		value?: string;
		id?: string
	 }[];

	meta?: { 
		title?: string;
		description?: string;
		keywords?: string;
		image?: string | Media
	 }
 };

export type Subsite = { 
	title: string;
	menuItems?: { 
		type?: 'link' | 'subMenu';
		link?: { 
			type?: 'reference' | 'custom';
			label: string;
			reference: 
				{ value: string | Page; relationTo: 'pages' } |
				{ value: string | Post; relationTo: 'posts' } |
				{ value: string | Housing; relationTo: 'housing' }
			;
			url: string
		 };
		label: string;
		subMenu?: { 
			column1?: 
				{ 
					appearance?: 'primary' | 'secondary' | 'arrow';
					link?: { 
						type?: 'reference' | 'custom';
						label: string;
						reference: 
							{ value: string | Page; relationTo: 'pages' } |
							{ value: string | Post; relationTo: 'posts' } |
							{ value: string | Housing; relationTo: 'housing' }
						;
						url: string
					 };
					id?: string;
					blockName?: string;
					blockType: 'menuLink'
				 } |

				{ 
					content: string;
					id?: string;
					blockName?: string;
					blockType: 'menuDescription'
				 } |

				{ 
					media: string | Media;
					headline: string;
					link?: { 
						type?: 'reference' | 'custom';
						reference: 
							{ value: string | Page; relationTo: 'pages' } |
							{ value: string | Post; relationTo: 'posts' } |
							{ value: string | Housing; relationTo: 'housing' }
						;
						url: string
					 };
					id?: string;
					blockName?: string;
					blockType: 'menuFeature'
				 }
			[];
			enableColumn2?: boolean;
			column2?: 
				{ 
					appearance?: 'primary' | 'secondary' | 'arrow';
					link?: { 
						type?: 'reference' | 'custom';
						label: string;
						reference: 
							{ value: string | Page; relationTo: 'pages' } |
							{ value: string | Post; relationTo: 'posts' } |
							{ value: string | Housing; relationTo: 'housing' }
						;
						url: string
					 };
					id?: string;
					blockName?: string;
					blockType: 'menuLink'
				 } |

				{ 
					content: string;
					id?: string;
					blockName?: string;
					blockType: 'menuDescription'
				 } |

				{ 
					media: string | Media;
					headline: string;
					link?: { 
						type?: 'reference' | 'custom';
						reference: 
							{ value: string | Page; relationTo: 'pages' } |
							{ value: string | Post; relationTo: 'posts' } |
							{ value: string | Housing; relationTo: 'housing' }
						;
						url: string
					 };
					id?: string;
					blockName?: string;
					blockType: 'menuFeature'
				 }
			[];
			enableColumn3?: boolean;
			column3?: 
				{ 
					appearance?: 'primary' | 'secondary' | 'arrow';
					link?: { 
						type?: 'reference' | 'custom';
						label: string;
						reference: 
							{ value: string | Page; relationTo: 'pages' } |
							{ value: string | Post; relationTo: 'posts' } |
							{ value: string | Housing; relationTo: 'housing' }
						;
						url: string
					 };
					id?: string;
					blockName?: string;
					blockType: 'menuLink'
				 } |

				{ 
					content: string;
					id?: string;
					blockName?: string;
					blockType: 'menuDescription'
				 } |

				{ 
					media: string | Media;
					headline: string;
					link?: { 
						type?: 'reference' | 'custom';
						reference: 
							{ value: string | Page; relationTo: 'pages' } |
							{ value: string | Post; relationTo: 'posts' } |
							{ value: string | Housing; relationTo: 'housing' }
						;
						url: string
					 };
					id?: string;
					blockName?: string;
					blockType: 'menuFeature'
				 }
			[]
		 };
		id?: string
	 }[];
	slug?: string;
	color?: 'green' | 'blue' | 'red' | 'purple';
	home: string | Page
 };

export type Footer = { 
	column1?: { 
		appearance?: 'primary' | 'secondary' | 'tertiary';
		label?: string;
		useLink?: boolean;
		link?: { 
			type?: 'reference' | 'custom';
			reference: 
				{ value: string | Page; relationTo: 'pages' } |
				{ value: string | Post; relationTo: 'posts' } |
				{ value: string | Housing; relationTo: 'housing' }
			;
			url: string
		 };
		id?: string
	 }[];

	column2?: { 
		appearance?: 'secondary' | 'tertiary';
		label?: string;
		useLink?: boolean;
		link?: { 
			type?: 'reference' | 'custom';
			reference: 
				{ value: string | Page; relationTo: 'pages' } |
				{ value: string | Post; relationTo: 'posts' } |
				{ value: string | Housing; relationTo: 'housing' }
			;
			url: string
		 };
		id?: string
	 }[]
 };

export type Meta = { 
	socialMediaLinks?: { 
		type: 'facebook' | 'vimeo' | 'twitter' | 'linkedin' | 'instagram';
		url: string;
		id?: string
	 }[];

	legalLinks?: { 
		link?: { 
			type?: 'reference' | 'custom';
			label: string;
			reference: 
				{ value: string | Page; relationTo: 'pages' } |
				{ value: string | Post; relationTo: 'posts' } |
				{ value: string | Housing; relationTo: 'housing' }
			;
			url: string
		 };
		id?: string
	 }[];
	locations?: string | Location[];
	phone?: string;
	nationalPhone?: string;
	fax?: string;
	popularSearchTerms?: { term: string; id?: string }[]
 };

export type PostCategories = PostCategories;
export type HousingCategories = HousingCategories;

export type Alerts = { 
	placement: 'global' | 'subsite';
	subsites: string | Subsite[];
	backgroundColor?: 'matchTheme' | 'green' | 'blue' | 'red' | 'purple';
	content: {  }[];
	links?: { 
		link?: { 
			appearance?: 'text' | 'primaryButton' | 'secondaryButton';
			type?: 'reference' | 'custom';
			label: string;
			reference: 
				{ value: string | Page; relationTo: 'pages' } |
				{ value: string | Post; relationTo: 'posts' } |
				{ value: string | Housing; relationTo: 'housing' }
			;
			url: string
		 };
		id?: string
	 }[]
 };

export type Search = { 
	title: string;
	description?: string;
	keywords?: string;
	slug: string;
	media?: string | Media;
	doc: 
		{ value: string | Page; relationTo: 'pages' } |
		{ value: string | Post; relationTo: 'posts' } |
		{ value: string | Housing; relationTo: 'housing' } |
		{ value: string | People; relationTo: 'people' } |
		{ value: string | Location; relationTo: 'locations' }
 };

export type People = People;

export type FormSubmissions = { 
	form: string | Form;
	submissionData?: { field: string; value: string; id?: string }[]
 };

export type Users = Users;