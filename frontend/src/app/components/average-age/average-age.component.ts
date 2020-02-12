import { Component, OnInit } from '@angular/core';
import { MembersService } from 'src/app/services/members.service';

@Component({
	selector: 'app-average-age',
	templateUrl: './average-age.component.html',
	styleUrls: ['./average-age.component.css']
})
export class AverageAgeComponent implements OnInit {
	loading: boolean = false;
	teams: string[] = ["Boca",
		"Estudiantes",
		"Gimnasia LP",
		"Hurac�n",
		"Independiente",
		"Newells",
		"Racing",
		"River",
		"Rosario Central",
		"San Lorenzo",
		"Velez"];
	defaultTeam: string = this.teams[6];
	averageAge: string = null;

	constructor(private members: MembersService) { }

	ngOnInit() {
		this.getTeamMembersAverageAge(this.defaultTeam);
	}

	public getTeamMembersAverageAge(team: string) {
		this.loading = false;
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
