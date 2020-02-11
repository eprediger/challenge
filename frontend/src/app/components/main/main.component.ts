import { Component, OnInit } from '@angular/core';
import { MembersService } from 'src/app/services/members.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {
  total: any = 0;

  constructor(private members: MembersService) { }

  ngOnInit() {
    this.members.getTotalMembers().subscribe((data: any) => {
      this.total = JSON.stringify(data);
    },
      (err: any) => {
        console.error(err);
      });
  }

}
