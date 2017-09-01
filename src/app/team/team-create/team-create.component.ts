import { AlertService } from './../../util/alert.service';

import { Team } from './../team.model';

import { User } from './../../user/user.model';

import { TeamService } from './../team.service';

import { Component, OnInit } from '@angular/core';

import { Router } from '@angular/router';


@Component({
  selector: 'app-team-create',
  templateUrl: './team-create.component.html',
  styleUrls: ['./team-create.component.css']
})
export class TeamCreateComponent implements OnInit {

	public budgetValue: number = 15000.00;

	public team: Team;
	public currentUser: User;

	/**
	 * Construtor.
	 *
	 * @param Router router
	 * @param TeamService teamService
	 */
	constructor(
		public router: Router,
		public teamService: TeamService,
		public alertService: AlertService
		) {
	}

	/**
	 * Método executado logo após a criação do componente.
	 */
	ngOnInit() {
		this.team = new Team();
		this.team.budget = this.budgetValue;
		this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
		this.team.idUser = this.currentUser.id;		
	}

	/**
	 * Método responsável por cadastrar um novo team.
	 */
	register() {
		console.log(this.team);
		this.teamService.register(this.team)
			.subscribe(
			(res) => {
				this.router.navigate(['/dashboard']);	
				window.location.reload();				
				this.alertService.success('Registro Efetuado com sucesso', true);
				
			},
			(err) => {
				this.alertService.error(err);
			});
	}
}
