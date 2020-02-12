import { Component, OnInit } from '@angular/core';
import { MembersService } from 'src/app/services/members.service';
import Constants from 'src/app/services/Constants';

@Component({
	selector: 'app-common-names',
	templateUrl: './common-names.component.html',
	styleUrls: ['./common-names.component.css']
})
export class CommonNamesComponent implements OnInit {
	loading: boolean = true;
	commonNames: any[];
	teams: string[] = Constants.EQUIPOS;
	initialTeam: string = Constants.RIVER;
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
