import { PlayerAttributes } from './playerAttributes.model';
export class Player {
	constructor(
		public id?: number,
		public name?: string,
		public position?: string,
		public baseId?: number,
		public rating?: number,
		public hasBid?:boolean,
		public attributes?: PlayerAttributes[]){}
}