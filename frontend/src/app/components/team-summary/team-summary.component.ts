import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MembersService } from 'src/app/services/members.service';

@Component({
	selector: 'app-team-summary',
	templateUrl: './team-summary.component.html',
	styleUrls: ['./team-summary.component.css']
})
export class TeamSummaryComponent implements OnInit {
	loading: boolean = true;

	displayedColumns: string[] = ["name", "total", "average", "min", "max"];
	dataSource: MatTableDataSource<any> = null;

	constructor(private members: MembersService) { }

	ngOnInit() {
		this.members.getMembersSummarize().subscribe(
			(response: any) => {
				this.dataSource = new MatTableDataSource<any>(response);
			},
			(err: any) => {
				console.error(err);
			},
			() => {
				this.loading = false;
			});
	}

}
