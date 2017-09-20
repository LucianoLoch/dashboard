export class PlayerFilterAttributes {
	constructor(
		public defending?: number,
		public dribbling?: number,
		public pace?: number,
		public passing?: number,
		public physical?: number,
		public shooting?: number,
		// GK 
		public kicking?: number,
		public speed?: number,
		public handling?: number,
		public positioning?: number,
		public reflexes?: number,
		public diving?: number
	){}
}


export class PlayerFilter {
	constructor(
		public name?: string,
		public position?: string,
		public rating?: number,
		public endValue?: number,
		public startValue?: number,
		public league?: number,
		public attributes?: PlayerFilterAttributes
	
	) { }
}

