import { Player } from './../player/player.model';

export class Team {
	constructor(
		public id?: number,
		public name?: string,
		public players?: Player[],
		public manager?: string,
		public budget?: number,
		public idUser?: number){}
}