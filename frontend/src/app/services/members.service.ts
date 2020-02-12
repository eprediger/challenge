import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from 'rxjs/internal/Observable';

import { environment } from '../../environments/environment';

@Injectable({
	providedIn: 'root'
})
export class MembersService {
	private endpoint: string = `${environment.members.protocol}://${environment.members.host}:${environment.members.port}`;

	constructor(private http: HttpClient) { }

	// uploadFile
	public upload(file: File): Observable<any> {
		const url: string = `${this.endpoint}/upload-csv`;

		const formData: FormData = new FormData();
		formData.append('file', file, file.name);

		const httpOptions = {
			headers: new HttpHeaders({
				'Accept': `application/json`
			})
		};

		return this.http.post(url, formData, httpOptions);
	}

	// getTotalMembers
	public getTotalMembers(): Observable<any> {
		const url: string = `${this.endpoint}/members/totalize`;

		return this.http.get(url);
	}

	// getTeamMembersAverageAge
	public getTeamMembersAverageAge(team: string): Observable<any> {
		const url: string = `${this.endpoint}/members/averageAge/${team}`;

		return this.http.get(url);
	}

	// getMembersListBy
	public getMembersListBy(maritalStatus: string, education: string): Observable<any> {
		const query: string = `?maritalStatus=${maritalStatus}&education=${education}`;
		const url: string = `${this.endpoint}/members/list${query}`;

		return this.http.get(url);
	}

	// getMostCommonNamesFrom
	public getMostCommonNamesFrom(team: string): Observable<any> {
		const url: string = `${this.endpoint}/members/commonNames/${team}`;

		return this.http.get(url);
	}

	// getMembersSummarize
	public getMembersSummarize() {
		const url: string = `${this.endpoint}/members/summarize`;

		return this.http.get(url);
	}
}
