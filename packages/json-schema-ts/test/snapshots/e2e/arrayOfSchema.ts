export interface ArrayOfSchema {
	countries?: { 
		/**
		* @minLength `2`
		* @maxLength `2`
		* @pattern `[A-Z]+`
		*/
		id: string;
		name: string
	 }[];
	tuple?: [{ foo?: string }?, { bar?: number }?]
}