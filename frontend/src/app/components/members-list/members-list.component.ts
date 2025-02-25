import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MembersService } from 'src/app/services/members.service';
import Constants from 'src/app/services/Constants';

@Component({
	selector: 'app-members-list',
	templateUrl: './members-list.component.html',
	styleUrls: ['./members-list.component.css']
})
export class MembersListComponent implements OnInit {
	loading: boolean = false;
	maritalStatus: string[] = Constants.ESTADO_CIVIL;
	status: string = Constants.CASADO;

	educations: string[] = Constants.EDUCACION;
	education: string = Constants.UNIVERSITARIO;

	// Tabla
	displayedColumns: string[] = ['name', 'age', 'teams'];
	dataSource: MatTableDataSource<any> = null;

	// Paginado
	@ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

	constructor(private members: MembersService) { }

	ngOnInit() {
		this.getMembersList(this.status, this.education);
	}

	/**
	 * getMembersList
	 */
	public getMembersList(maritalStatus: string, education: string) {
		this.loading = true;
		this.members.getMembersListBy(maritalStatus, education).subscribe(
			(response: any) => {
				this.dataSource = new MatTableDataSource<any>(response.data);
				this.dataSource.paginator = this.paginator;
			}, (err: any) => {
				console.error(err);
			},
			() => {
				this.loading = false;
			}
		);
	}
}
