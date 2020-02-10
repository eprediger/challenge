import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MembersService } from 'src/app/services/members.service';

@Component({
	selector: 'app-home',
	templateUrl: './home.component.html',
	styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
	@ViewChild('labelImport', { static: true }) labelImport: ElementRef;
	formImport: FormGroup;
	file: File = null;

	constructor(private members: MembersService) {
		this.formImport = new FormGroup({
			importFile: new FormControl('', Validators.required)
		});
	}

	ngOnInit() { }

	public upload(files: FileList) {
		this.labelImport.nativeElement.innerText = Array.from(files)
			.map(f => f.name)
			.join(', ');
		this.file = files[0];

		this.members.upload(this.file).subscribe(
			(data: any) => {
				console.log(data);
			},
			(error: any) => {
				console.error(error);
			});
	}
}
