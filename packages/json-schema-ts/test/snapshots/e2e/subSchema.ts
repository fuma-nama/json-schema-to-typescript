export interface SubSchema {
	firstName: string;
	friend?: { knowsFrom: 'work' | 'school' | 'other' };
	coworker?: 
		{ company?: { name: string } } &
		Record<string, 10 | 20 | 30>
}