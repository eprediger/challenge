import { Component, OnInit } from '@angular/core';
import { MembersService } from 'src/app/services/members.service';

@Component({
	selector: 'app-common-names',
	templateUrl: './common-names.component.html',
	styleUrls: ['./common-names.component.css']
})
export class CommonNamesComponent implements OnInit {
	loading: boolean = true;
	commonNames: any[];
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
	initialTeam: string = this.teams[7];
	displayedColumns: string[] = ['name', 'count'];

	constructor(private members: MembersService) { }

	ngOnInit() {
		this.getCommonNames(this.initialTeam);
	}

	getCommonNames(team: string) {
		this.loading = true;
		this.members.getMostCommonNamesFrom(team).subscribe(
			(response: any) => {
				this.commonNames = response;
			},
			(err: any) => {
				console.error(err);
			},
			() => {
				this.loading = false;
			});
	}
}
