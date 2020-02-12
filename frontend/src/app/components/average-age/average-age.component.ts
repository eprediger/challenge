import { Component, OnInit } from '@angular/core';
import { MembersService } from 'src/app/services/members.service';
import Constants from 'src/app/services/Constants';

@Component({
	selector: 'app-average-age',
	templateUrl: './average-age.component.html',
	styleUrls: ['./average-age.component.css']
})
export class AverageAgeComponent implements OnInit {
	loading: boolean = false;
	teams: string[] = Constants.EQUIPOS;
	defaultTeam: string = Constants.RACING;
	averageAge: string = null;

	constructor(private members: MembersService) { }

	ngOnInit() {
		this.getTeamMembersAverageAge(this.defaultTeam);
	}

	public getTeamMembersAverageAge(team: string) {
		this.loading = true;
		this.members.getTeamMembersAverageAge(team).subscribe(
			(data) => {
				this.averageAge = data.averageAge;
			},
			(err: any) => {
				console.error(err);
			},
			() => {
				this.loading = false;
			});
	}
}
