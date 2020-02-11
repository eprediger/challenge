import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { MainComponent } from './components/main/main.component';
import { AverageAgeComponent } from './components/average-age/average-age.component';
import { MembersListComponent } from './components/members-list/members-list.component';
import { CommonNamesComponent } from './components/common-names/common-names.component';
import { TeamSummaryComponent } from './components/team-summary/team-summary.component';

const routes: Routes = [
  { path: "", component: HomeComponent },
  { path: "main", component: MainComponent },
  { path: "average-age", component: AverageAgeComponent },
  { path: "members-list", component: MembersListComponent },
  { path: "common-names", component: CommonNamesComponent },
  { path: "team-summary", component: TeamSummaryComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
