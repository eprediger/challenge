import { Component, OnInit } from '@angular/core';
import { MembersService } from 'src/app/services/members.service';

@Component({
  selector: 'app-average-age',
  templateUrl: './average-age.component.html',
  styleUrls: ['./average-age.component.css']
})
export class AverageAgeComponent implements OnInit {
  teams: string[] = ["Racing"];
  averageAge: string = null;

  constructor(private members: MembersService) { }

  ngOnInit() {
  }

  public getTeamMembersAverageAge(team: string) {
    this.members.getTeamMembersAverageAge(team).subscribe(
      (data) => {
        this.averageAge = data.averageAge;
      });
  }

}
