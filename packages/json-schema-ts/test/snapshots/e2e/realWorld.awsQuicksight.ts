/*Definition of the AWS::QuickSight::DataSet Resource Type.*/ export type RealWorldAwsQuicksight = { 
	/*<p>The Amazon Resource Name (ARN) of the resource.</p>*/ Arn?: string;
	AwsAccountId?: string;
	/*<p>Groupings of columns that work together in certain QuickSight features. Currently, only geospatial hierarchy is supported.</p>*/ ColumnGroups?: /*<p>Groupings of columns that work together in certain Amazon QuickSight features. This is
	            a variant type structure. For this structure to be valid, only one of the attributes can
	            be non-null.</p>*/
	{ 
		/*<p>Geospatial column group that denotes a hierarchy.</p>*/ GeoSpatialColumnGroup?: { 
			/*<p>Columns in this hierarchy.</p>*/ Columns: string[];
			CountryCode?: 'US';
			/*<p>A display name for the hierarchy.</p>*/ Name: string
		 }
	 }[];
	ColumnLevelPermissionRules?: { ColumnNames?: string[]; Principals?: string[] }[];
	/*<p>The amount of SPICE capacity used by this dataset. This is 0 if the dataset isn't
	            imported into SPICE.</p>*/
	ConsumedSpiceCapacityInBytes?: number;
	/*<p>The time that this dataset was created.</p>*/ CreatedTime?: string;
	DataSetId?: string;
	FieldFolders?: Record<string, { Description?: string; Columns?: string[] }>;
	ImportMode?: 'SPICE' | 'DIRECT_QUERY';
	/*<p>The last time that this dataset was updated.</p>*/ LastUpdatedTime?: string;
	LogicalTableMap?: Record<string, /*<p>A <i>logical table</i> is a unit that joins and that data
	            transformations operate on. A logical table has a source, which can be either a physical
	            table or result of a join. When a logical table points to a physical table, the logical
	            table acts as a mutable copy of that physical table through transform operations.</p>*/
	{ 
		/*<p>A display name for the logical table.</p>*/ Alias: string;
		/*<p>Transform operations that act on this logical table.</p>*/ DataTransforms?: /*<p>A data transformation on a logical table. This is a variant type structure. For this
		            structure to be valid, only one of the attributes can be non-null.</p>*/
		{ 
			/*<p>A transform operation that tags a column with additional information.</p>*/ TagColumnOperation?: { 
				/*<p>The column that this operation acts on.</p>*/ ColumnName: string;
				/*<p>The dataset column tag, currently only used for geospatial type tagging. .</p>
				        <note>
				            <p>This is not tags for the AWS tagging feature. .</p>
				        </note>*/
				Tags: /*<p>A tag for a column in a <a>TagColumnOperation</a> structure. This is a
				            variant type structure. For this structure to be valid, only one of the attributes can
				            be non-null.</p>*/
				{ 
					ColumnGeographicRole?: 
						'COUNTRY' |
						'STATE' |
						'COUNTY' |
						'CITY' |
						'POSTCODE' |
						'LONGITUDE' |
						'LATITUDE' |
						'POLITICAL1'
					;

					/*<p>Metadata that contains a description for a column.</p>*/ ColumnDescription?: { 
						/*<p>The text of a description for a column.</p>*/ Text?: string
					 }
				 }[]
			 };

			/*<p>A transform operation that filters rows based on a condition.</p>*/ FilterOperation?: { 
				/*<p>An expression that must evaluate to a Boolean value. Rows for which the expression
				            evaluates to true are kept in the dataset.</p>*/
				ConditionExpression: string
			 };

			/*<p>A transform operation that casts a column to a different type.</p>*/ CastColumnTypeOperation?: { 
				/*<p>Column name.</p>*/ ColumnName: string;
				/*<p>When casting a column from string to datetime type, you can supply a string in a
				            format supported by Amazon QuickSight to denote the source data format.</p>*/
				Format?: string;
				NewColumnType: ColumnDataType
			 };

			/*<p>A transform operation that creates calculated columns. Columns created in one such
			            operation form a lexical closure.</p>*/
			CreateColumnsOperation?: { 
				/*<p>Calculated columns to create.</p>*/ Columns: /*<p>A calculated column for a dataset.</p>*/ { 
					/*<p>A unique ID to identify a calculated column. During a dataset update, if the column ID
					            of a calculated column matches that of an existing calculated column, Amazon QuickSight
					            preserves the existing calculated column.</p>*/
					ColumnId: string;
					/*<p>Column name.</p>*/ ColumnName: string;
					/*<p>An expression that defines the calculated column.</p>*/ Expression: string
				 }[]
			 };

			/*<p>A transform operation that renames a column.</p>*/ RenameColumnOperation?: { 
				/*<p>The new name for the column.</p>*/ NewColumnName: string;
				/*<p>The name of the column to be renamed.</p>*/ ColumnName: string
			 };

			/*<p>A transform operation that projects columns. Operations that come after a projection
			            can only refer to projected columns.</p>*/
			ProjectOperation?: { /*<p>Projected columns.</p>*/ ProjectedColumns: string[] }
		 }[];

		/*<p>Information about the source of a logical table. This is a variant type structure. For
		            this structure to be valid, only one of the attributes can be non-null.</p>*/
		Source: { 
			/*<p>Physical table ID.</p>*/ PhysicalTableId?: string;
			/*<p>Join instruction.</p>*/ JoinInstruction?: { 
				/*<p>On Clause.</p>*/ OnClause: string;
				Type: 'INNER' | 'OUTER' | 'LEFT' | 'RIGHT';
				LeftJoinKeyProperties?: JoinKeyProperties;
				/*<p>Left operand.</p>*/ LeftOperand: string;
				/*<p>Right operand.</p>*/ RightOperand: string;
				RightJoinKeyProperties?: JoinKeyProperties
			 }
		 }
	 }>;
	/*<p>The display name for the dataset.</p>*/ Name?: string;
	/*<p>The list of columns after all transforms. These columns are available in templates,
	            analyses, and dashboards.</p>*/
	OutputColumns?: /*<p>Output column.</p>*/ { 
		Type?: ColumnDataType;
		/*<p>A description for a column.</p>*/ Description?: string;
		/*<p>A display name for the dataset.</p>*/ Name?: string
	 }[];

	/*<p>A list of resource permissions on the dataset.</p>*/ Permissions?: /*<p>Permission for the resource.</p>*/ { 
		/*<p>The IAM action to grant or revoke permissions on.</p>*/ Actions: string[];
		/*<p>The Amazon Resource Name (ARN) of the principal. This can be one of the
		            following:</p>
		        <ul>
		            <li>
		                <p>The ARN of an Amazon QuickSight user or group associated with a data source or dataset. (This is common.)</p>
		            </li>
		            <li>
		                <p>The ARN of an Amazon QuickSight user, group, or namespace associated with an analysis, dashboard, template, or theme. (This is common.)</p>
		            </li>
		            <li>
		                <p>The ARN of an AWS account root: This is an IAM ARN rather than a QuickSight
		                    ARN. Use this option only to share resources (templates) across AWS accounts.
		                    (This is less common.) </p>
		            </li>
		         </ul>*/
		Principal: string
	 }[];

	PhysicalTableMap?: Record<string, /*<p>A view of a data source that contains information about the shape of the data in the
	            underlying source. This is a variant type structure. For this structure to be valid,
	            only one of the attributes can be non-null.</p>*/
	{ 
		/*<p>A physical table type for relational data sources.</p>*/ RelationalTable?: { 
			/*<p>The Amazon Resource Name (ARN) for the data source.</p>*/ DataSourceArn: string;
			/*<p>The column schema of the table.</p>*/ InputColumns: /*<p>Metadata for a column that is used as the input of a transform operation.</p>*/ InputColumn[];
			/*<p>The schema name. This name applies to certain relational database engines.</p>*/ Schema?: string;
			/*<p>The catalog associated with a table.</p>*/ Catalog?: string;
			/*<p>The name of the relational table.</p>*/ Name: string
		 };

		/*<p>A physical table type built from the results of the custom SQL query.</p>*/ CustomSql?: { 
			/*<p>The Amazon Resource Name (ARN) of the data source.</p>*/ DataSourceArn: string;
			/*<p>The SQL query.</p>*/ SqlQuery: string;
			/*<p>The column schema from the SQL query result set.</p>*/ Columns: /*<p>Metadata for a column that is used as the input of a transform operation.</p>*/ InputColumn[];
			/*<p>A display name for the SQL query result.</p>*/ Name: string
		 };

		/*<p>A physical table type for as S3 data source.</p>*/ S3Source?: { 
			/*<p>The amazon Resource Name (ARN) for the data source.</p>*/ DataSourceArn: string;
			/*<p>A physical table type for as S3 data source.</p>*/ InputColumns: /*<p>Metadata for a column that is used as the input of a transform operation.</p>*/ InputColumn[];
			/*<p>Information about the format for a source file or files.</p>*/ UploadSettings?: { 
				/*<p>Whether the file has a header row, or the files each have a header row.</p>*/ ContainsHeader?: boolean;
				TextQualifier?: 'DOUBLE_QUOTE' | 'SINGLE_QUOTE';
				Format?: 'CSV' | 'TSV' | 'CLF' | 'ELF' | 'XLSX' | 'JSON';
				/*<p>A row number to start reading data from.</p>*/ StartFromRow?: number;
				/*<p>The delimiter between values in the file.</p>*/ Delimiter?: string
			 }
		 }
	 }>;

	/*<p>The row-level security configuration for the dataset.</p>*/ RowLevelPermissionDataSet?: { 
		/*<p>The Amazon Resource Name (ARN) of the permission dataset.</p>*/ Arn: string;
		/*<p>The namespace associated with the row-level permissions dataset.</p>*/ Namespace?: string;
		PermissionPolicy: 'GRANT_ACCESS' | 'DENY_ACCESS';
		FormatVersion?: 'VERSION_1' | 'VERSION_2'
	 };

	/*<p>Contains a map of the key-value pairs for the resource tag or tags assigned to the dataset.</p>*/ Tags?: /*<p>The key or keys of the key-value pairs for the resource tag or tags assigned to the
	            resource.</p>*/
	{ 
		/*<p>Tag value.</p>*/ Value: string;
		/*<p>Tag key.</p>*/ Key: string
	 }[];

	/*<p>Wait policy to use when creating/updating dataset. Default is to wait for SPICE ingestion to finish with timeout of 36 hours.</p>*/ IngestionWaitPolicy?: { 
		/*<p>Wait for SPICE ingestion to finish to mark dataset creation/update successful. Default (true).
		  Applicable only when DataSetImportMode mode is set to SPICE.</p>*/
		WaitForSpiceIngestion?: boolean;

		/*<p>The maximum time (in hours) to wait for Ingestion to complete. Default timeout is 36 hours.
		 Applicable only when DataSetImportMode mode is set to SPICE and WaitForSpiceIngestion is set to true.</p>*/
		IngestionWaitTimeInHours?: number
	 }
 };

export type JoinKeyProperties = { UniqueKey?: boolean };
export type ColumnDataType = 'STRING' | 'INTEGER' | 'DECIMAL' | 'DATETIME';

export type InputColumn = { 
	Type: 
		'STRING' |
		'INTEGER' |
		'DECIMAL' |
		'DATETIME' |
		'BIT' |
		'BOOLEAN' |
		'JSON'
	;
	/*<p>The name of this column in the underlying data source.</p>*/ Name: string
 };