/**
* Definition of the AWS::QuickSight::DataSet Resource Type.
*/
export interface RealWorldAwsQuicksight {
	/**
	* <p>The Amazon Resource Name (ARN) of the resource.</p>
	*/
	Arn?: string;

	/**
	* @maxLength `12`
	* @minLength `12`
	* @pattern `^[0-9]{12}$`
	*/
	AwsAccountId?: string;

	/**
	* <p>Groupings of columns that work together in certain QuickSight features. Currently, only geospatial hierarchy is supported.</p>
	* @maxItems `8`
	* @minItems `1`
	*/
	ColumnGroups?: ColumnGroup[];

	/**
	* @minItems `1`
	*/
	ColumnLevelPermissionRules?: ColumnLevelPermissionRule[];

	/**
	* <p>The amount of SPICE capacity used by this dataset. This is 0 if the dataset isn't
	*             imported into SPICE.</p>
	*/
	ConsumedSpiceCapacityInBytes?: number;

	/**
	* <p>The time that this dataset was created.</p>
	* @format `string`
	*/
	CreatedTime?: string;
	DataSetId?: string;
	FieldFolders?: FieldFolderMap;
	ImportMode?: DataSetImportMode;
	/**
	* <p>The last time that this dataset was updated.</p>
	* @format `string`
	*/
	LastUpdatedTime?: string;
	LogicalTableMap?: LogicalTableMap;
	/**
	* <p>The display name for the dataset.</p>
	* @maxLength `128`
	* @minLength `1`
	*/
	Name?: string;

	/**
	* <p>The list of columns after all transforms. These columns are available in templates,
	*             analyses, and dashboards.</p>
	*/
	OutputColumns?: OutputColumn[];

	/**
	* <p>A list of resource permissions on the dataset.</p>
	* @maxItems `64`
	* @minItems `1`
	*/
	Permissions?: ResourcePermission[];
	PhysicalTableMap?: PhysicalTableMap;
	RowLevelPermissionDataSet?: RowLevelPermissionDataSet;
	/**
	* <p>Contains a map of the key-value pairs for the resource tag or tags assigned to the dataset.</p>
	* @maxItems `200`
	* @minItems `1`
	*/
	Tags?: Tag[];
	IngestionWaitPolicy?: IngestionWaitPolicy
}

/**
* <p>Groupings of columns that work together in certain Amazon QuickSight features. This is
*             a variant type structure. For this structure to be valid, only one of the attributes can
*             be non-null.</p>
*/
export interface ColumnGroup { GeoSpatialColumnGroup?: GeoSpatialColumnGroup }

/**
* <p>Geospatial column group that denotes a hierarchy.</p>
*/
export interface GeoSpatialColumnGroup {
	/**
	* <p>Columns in this hierarchy.</p>
	* @maxItems `16`
	* @minItems `1`
	*/
	Columns: /**
	* @maxLength `128`
	* @minLength `1`
	*/
	string[];
	CountryCode?: GeoSpatialCountryCode;
	/**
	* <p>A display name for the hierarchy.</p>
	* @maxLength `64`
	* @minLength `1`
	*/
	Name: string
}

export type GeoSpatialCountryCode = 'US';

export interface ColumnLevelPermissionRule {
	/**
	* @minItems `1`
	*/
	ColumnNames?: string[];

	/**
	* @maxItems `100`
	* @minItems `1`
	*/
	Principals?: string[]
}

export type FieldFolderMap = Record<string, FieldFolder>;

export interface FieldFolder {
	/**
	* @maxLength `500`
	* @minLength `0`
	*/
	Description?: string;

	/**
	* @maxItems `5000`
	* @minItems `0`
	*/
	Columns?: string[]
}

export type DataSetImportMode = 'SPICE' | 'DIRECT_QUERY';

/**
* @maxProperties `64`
* @minProperties `1`
*/
export type LogicalTableMap = Record<string, LogicalTable>;

/**
* <p>A <i>logical table</i> is a unit that joins and that data
*             transformations operate on. A logical table has a source, which can be either a physical
*             table or result of a join. When a logical table points to a physical table, the logical
*             table acts as a mutable copy of that physical table through transform operations.</p>
*/
export interface LogicalTable {
	/**
	* <p>A display name for the logical table.</p>
	* @maxLength `64`
	* @minLength `1`
	*/
	Alias: string;

	/**
	* <p>Transform operations that act on this logical table.</p>
	* @maxItems `2048`
	* @minItems `1`
	*/
	DataTransforms?: TransformOperation[];
	Source: LogicalTableSource
}

/**
* <p>A data transformation on a logical table. This is a variant type structure. For this
*             structure to be valid, only one of the attributes can be non-null.</p>
*/
export interface TransformOperation {
	TagColumnOperation?: TagColumnOperation;
	FilterOperation?: FilterOperation;
	CastColumnTypeOperation?: CastColumnTypeOperation;
	CreateColumnsOperation?: CreateColumnsOperation;
	RenameColumnOperation?: RenameColumnOperation;
	ProjectOperation?: ProjectOperation
}

/**
* <p>A transform operation that tags a column with additional information.</p>
*/
export interface TagColumnOperation {
	/**
	* <p>The column that this operation acts on.</p>
	* @maxLength `128`
	* @minLength `1`
	*/
	ColumnName: string;

	/**
	* <p>The dataset column tag, currently only used for geospatial type tagging. .</p>
	*         <note>
	*             <p>This is not tags for the AWS tagging feature. .</p>
	*         </note>
	* @maxItems `16`
	* @minItems `1`
	*/
	Tags: ColumnTag[]
}

/**
* <p>A tag for a column in a <a>TagColumnOperation</a> structure. This is a
*             variant type structure. For this structure to be valid, only one of the attributes can
*             be non-null.</p>
*/
export interface ColumnTag {
	ColumnGeographicRole?: GeoSpatialDataRole;
	ColumnDescription?: ColumnDescription
}

export type GeoSpatialDataRole = 
	'COUNTRY' |
	'STATE' |
	'COUNTY' |
	'CITY' |
	'POSTCODE' |
	'LONGITUDE' |
	'LATITUDE' |
	'POLITICAL1'
;

/**
* <p>Metadata that contains a description for a column.</p>
*/
export interface ColumnDescription {
	/**
	* <p>The text of a description for a column.</p>
	* @maxLength `500`
	* @minLength `0`
	*/
	Text?: string
}

/**
* <p>A transform operation that filters rows based on a condition.</p>
*/
export interface FilterOperation {
	/**
	* <p>An expression that must evaluate to a Boolean value. Rows for which the expression
	*             evaluates to true are kept in the dataset.</p>
	* @maxLength `4096`
	* @minLength `1`
	*/
	ConditionExpression: string
}

/**
* <p>A transform operation that casts a column to a different type.</p>
*/
export interface CastColumnTypeOperation {
	/**
	* <p>Column name.</p>
	* @maxLength `128`
	* @minLength `1`
	*/
	ColumnName: string;

	/**
	* <p>When casting a column from string to datetime type, you can supply a string in a
	*             format supported by Amazon QuickSight to denote the source data format.</p>
	* @maxLength `32`
	* @minLength `0`
	*/
	Format?: string;
	NewColumnType: ColumnDataType
}

export type ColumnDataType = 'STRING' | 'INTEGER' | 'DECIMAL' | 'DATETIME';

/**
* <p>A transform operation that creates calculated columns. Columns created in one such
*             operation form a lexical closure.</p>
*/
export interface CreateColumnsOperation {
	/**
	* <p>Calculated columns to create.</p>
	* @maxItems `128`
	* @minItems `1`
	*/
	Columns: CalculatedColumn[]
}

/**
* <p>A calculated column for a dataset.</p>
*/
export interface CalculatedColumn {
	/**
	* <p>A unique ID to identify a calculated column. During a dataset update, if the column ID
	*             of a calculated column matches that of an existing calculated column, Amazon QuickSight
	*             preserves the existing calculated column.</p>
	* @maxLength `64`
	* @minLength `1`
	*/
	ColumnId: string;

	/**
	* <p>Column name.</p>
	* @maxLength `128`
	* @minLength `1`
	*/
	ColumnName: string;

	/**
	* <p>An expression that defines the calculated column.</p>
	* @maxLength `4096`
	* @minLength `1`
	*/
	Expression: string
}

/**
* <p>A transform operation that renames a column.</p>
*/
export interface RenameColumnOperation {
	/**
	* <p>The new name for the column.</p>
	* @maxLength `128`
	* @minLength `1`
	*/
	NewColumnName: string;

	/**
	* <p>The name of the column to be renamed.</p>
	* @maxLength `128`
	* @minLength `1`
	*/
	ColumnName: string
}

/**
* <p>A transform operation that projects columns. Operations that come after a projection
*             can only refer to projected columns.</p>
*/
export interface ProjectOperation {
	/**
	* <p>Projected columns.</p>
	* @maxItems `2000`
	* @minItems `1`
	*/
	ProjectedColumns: string[]
}

/**
* <p>Information about the source of a logical table. This is a variant type structure. For
*             this structure to be valid, only one of the attributes can be non-null.</p>
*/
export interface LogicalTableSource {
	/**
	* <p>Physical table ID.</p>
	* @maxLength `64`
	* @minLength `1`
	* @pattern `[0-9a-zA-Z-]*`
	*/
	PhysicalTableId?: string;
	JoinInstruction?: JoinInstruction
}

/**
* <p>Join instruction.</p>
*/
export interface JoinInstruction {
	/**
	* <p>On Clause.</p>
	* @maxLength `512`
	* @minLength `1`
	*/
	OnClause: string;
	Type: JoinType;
	LeftJoinKeyProperties?: JoinKeyProperties;
	/**
	* <p>Left operand.</p>
	* @maxLength `64`
	* @minLength `1`
	* @pattern `[0-9a-zA-Z-]*`
	*/
	LeftOperand: string;

	/**
	* <p>Right operand.</p>
	* @maxLength `64`
	* @minLength `1`
	* @pattern `[0-9a-zA-Z-]*`
	*/
	RightOperand: string;
	RightJoinKeyProperties?: JoinKeyProperties
}

export type JoinType = 'INNER' | 'OUTER' | 'LEFT' | 'RIGHT';
export interface JoinKeyProperties { UniqueKey?: boolean }

/**
* <p>Output column.</p>
*/
export interface OutputColumn {
	Type?: ColumnDataType;
	/**
	* <p>A description for a column.</p>
	* @maxLength `500`
	* @minLength `0`
	*/
	Description?: string;

	/**
	* <p>A display name for the dataset.</p>
	* @maxLength `128`
	* @minLength `1`
	*/
	Name?: string
}

/**
* <p>Permission for the resource.</p>
*/
export interface ResourcePermission {
	/**
	* <p>The IAM action to grant or revoke permissions on.</p>
	* @maxItems `16`
	* @minItems `1`
	*/
	Actions: string[];

	/**
	* <p>The Amazon Resource Name (ARN) of the principal. This can be one of the
	*             following:</p>
	*         <ul>
	*             <li>
	*                 <p>The ARN of an Amazon QuickSight user or group associated with a data source or dataset. (This is common.)</p>
	*             </li>
	*             <li>
	*                 <p>The ARN of an Amazon QuickSight user, group, or namespace associated with an analysis, dashboard, template, or theme. (This is common.)</p>
	*             </li>
	*             <li>
	*                 <p>The ARN of an AWS account root: This is an IAM ARN rather than a QuickSight
	*                     ARN. Use this option only to share resources (templates) across AWS accounts.
	*                     (This is less common.) </p>
	*             </li>
	*          </ul>
	* @maxLength `256`
	* @minLength `1`
	*/
	Principal: string
}

/**
* @maxProperties `32`
* @minProperties `1`
*/
export type PhysicalTableMap = Record<string, PhysicalTable>;

/**
* <p>A view of a data source that contains information about the shape of the data in the
*             underlying source. This is a variant type structure. For this structure to be valid,
*             only one of the attributes can be non-null.</p>
*/
export interface PhysicalTable {
	RelationalTable?: RelationalTable;
	CustomSql?: CustomSql;
	S3Source?: S3Source
}

/**
* <p>A physical table type for relational data sources.</p>
*/
export interface RelationalTable {
	/**
	* <p>The Amazon Resource Name (ARN) for the data source.</p>
	*/
	DataSourceArn: string;

	/**
	* <p>The column schema of the table.</p>
	* @maxItems `2048`
	* @minItems `1`
	*/
	InputColumns: InputColumn[];

	/**
	* <p>The schema name. This name applies to certain relational database engines.</p>
	* @maxLength `64`
	* @minLength `0`
	*/
	Schema?: string;

	/**
	* <p>The catalog associated with a table.</p>
	* @maxLength `256`
	* @minLength `0`
	*/
	Catalog?: string;

	/**
	* <p>The name of the relational table.</p>
	* @maxLength `64`
	* @minLength `1`
	*/
	Name: string
}

/**
* <p>Metadata for a column that is used as the input of a transform operation.</p>
*/
export interface InputColumn {
	Type: InputColumnDataType;
	/**
	* <p>The name of this column in the underlying data source.</p>
	* @maxLength `128`
	* @minLength `1`
	*/
	Name: string
}

export type InputColumnDataType = 
	'STRING' |
	'INTEGER' |
	'DECIMAL' |
	'DATETIME' |
	'BIT' |
	'BOOLEAN' |
	'JSON'
;

/**
* <p>A physical table type built from the results of the custom SQL query.</p>
*/
export interface CustomSql {
	/**
	* <p>The Amazon Resource Name (ARN) of the data source.</p>
	*/
	DataSourceArn: string;

	/**
	* <p>The SQL query.</p>
	* @maxLength `65536`
	* @minLength `1`
	*/
	SqlQuery: string;

	/**
	* <p>The column schema from the SQL query result set.</p>
	* @maxItems `2048`
	* @minItems `1`
	*/
	Columns: InputColumn[];

	/**
	* <p>A display name for the SQL query result.</p>
	* @maxLength `128`
	* @minLength `1`
	*/
	Name: string
}

/**
* <p>A physical table type for as S3 data source.</p>
*/
export interface S3Source {
	/**
	* <p>The amazon Resource Name (ARN) for the data source.</p>
	*/
	DataSourceArn: string;

	/**
	* <p>A physical table type for as S3 data source.</p>
	* @maxItems `2048`
	* @minItems `1`
	*/
	InputColumns: InputColumn[];
	UploadSettings?: UploadSettings
}

/**
* <p>Information about the format for a source file or files.</p>
*/
export interface UploadSettings {
	/**
	* <p>Whether the file has a header row, or the files each have a header row.</p>
	*/
	ContainsHeader?: boolean;
	TextQualifier?: TextQualifier;
	Format?: FileFormat;
	/**
	* <p>A row number to start reading data from.</p>
	* @minimum `1`
	*/
	StartFromRow?: number;

	/**
	* <p>The delimiter between values in the file.</p>
	* @maxLength `1`
	* @minLength `1`
	*/
	Delimiter?: string
}

export type TextQualifier = 'DOUBLE_QUOTE' | 'SINGLE_QUOTE';
export type FileFormat = 'CSV' | 'TSV' | 'CLF' | 'ELF' | 'XLSX' | 'JSON';

/**
* <p>The row-level security configuration for the dataset.</p>
*/
export interface RowLevelPermissionDataSet {
	/**
	* <p>The Amazon Resource Name (ARN) of the permission dataset.</p>
	*/
	Arn: string;

	/**
	* <p>The namespace associated with the row-level permissions dataset.</p>
	* @maxLength `64`
	* @minLength `0`
	* @pattern `^[a-zA-Z0-9._-]*$`
	*/
	Namespace?: string;
	PermissionPolicy: RowLevelPermissionPolicy;
	FormatVersion?: RowLevelPermissionFormatVersion
}

export type RowLevelPermissionPolicy = 'GRANT_ACCESS' | 'DENY_ACCESS';
export type RowLevelPermissionFormatVersion = 'VERSION_1' | 'VERSION_2';

/**
* <p>The key or keys of the key-value pairs for the resource tag or tags assigned to the
*             resource.</p>
*/
export interface Tag {
	/**
	* <p>Tag value.</p>
	* @maxLength `256`
	* @minLength `1`
	*/
	Value: string;

	/**
	* <p>Tag key.</p>
	* @maxLength `128`
	* @minLength `1`
	*/
	Key: string
}

/**
* <p>Wait policy to use when creating/updating dataset. Default is to wait for SPICE ingestion to finish with timeout of 36 hours.</p>
*/
export interface IngestionWaitPolicy {
	/**
	* <p>Wait for SPICE ingestion to finish to mark dataset creation/update successful. Default (true).
	*   Applicable only when DataSetImportMode mode is set to SPICE.</p>
	* @default `true`
	*/
	WaitForSpiceIngestion?: boolean;

	/**
	* <p>The maximum time (in hours) to wait for Ingestion to complete. Default timeout is 36 hours.
	*  Applicable only when DataSetImportMode mode is set to SPICE and WaitForSpiceIngestion is set to true.</p>
	* @minimum `1`
	* @maximum `36`
	* @default `36`
	*/
	IngestionWaitTimeInHours?: number
}