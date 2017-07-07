export class Bidinfo {
	constructor(
		public id?: number,
		public bidValue?: number,
		public teamID?: number,
		public originalValue?: number,
		public playerID?: number,
		public playerName?: string,
		public bidAproved?: boolean){}
}