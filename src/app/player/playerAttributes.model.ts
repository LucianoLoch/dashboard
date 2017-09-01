export class PlayerAttributes {
	constructor(
		public id?: number,
		public name?: string,
		public value?: number){
            this.name = this.name.slice(-15);
        }
}