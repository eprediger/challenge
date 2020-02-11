import { Component, OnInit } from '@angular/core';
import { MembersService } from 'src/app/services/members.service';

@Component({
	selector: 'app-navbar',
	templateUrl: './navbar.component.html',
	styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
	total: number = 0;

	constructor(private members: MembersService) { }

	ngOnInit() {
		this.members.getTotalMembers().subscribe((data: any) => {
			this.total = data.total;
		},
			(err: any) => {
				console.error(err);
			});
	}
}
