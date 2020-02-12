import express from "express";
import multer from 'multer';
import * as fs from 'fs';
import * as csv from 'fast-csv';

import Member from "./model/Member";

const LISTEN_PORT: number = 8080; // default port to listen
const DEST_FOLDER = './tmp';
const HEADERS: string[] = ['name', 'age', 'team', 'maritalStatus', 'education'];
const DELIMITER: string = ";";

const upload = multer({ dest: DEST_FOLDER });
const app = express();

let members: Member[] = [];

// Subida archivo
app.post('/upload-csv', upload.single('file'), (req, res) => {
	const filePath = req.file.path;
	members = [];

	fs.createReadStream(filePath, 'utf8')
		.pipe(csv.parse({ headers: HEADERS, delimiter: DELIMITER }))
		.on('data', (row: any) => {
			const newMember: Member = new Member(row.name, row.age, row.team, row.maritalStatus, row.education);
			members.push(newMember);
		})
		.on('error', (error: any) => {
			res.status(500);
			res.send(error);
		})
		.on('end', (rowCount: number) => {
			fs.unlink(`${filePath}`, () => { });
			// TODO: refactor borrado directorio cuando termina el svr
			// fs.rmdir(`${DEST_FOLDER}`, () => {});
			res.status(200);
			res.send({ rows: rowCount });
		});
});

// Cantidad total de personas registradas.
app.get("/members/totalize", (req, res) => {
	res.status(200);
	res.send({ total: members.length });
});

/* El promedio de edad de los socios de Racing. */
app.get("/members/averageAge/:team", (req, res) => {
	const queryTeam: string = req.params.team;

	if (queryTeam) {
		let averageAge: number = 0;
		let totalAge: number = 0;
		let totalMembers: number = 0;

		for (const member of members) {
			if (member.isFan(queryTeam)) {
				totalAge += member.memberAge;
				totalMembers++;
			}
		}

		averageAge = totalAge / totalMembers;

		res.status(200);
		res.send({ averageAge });
	} else {
		res.status(400);
		res.send({ error: "Missing team" });
	}
});

/* Un listado con las 100 primeras personas casadas, con estudios
Universitarios, ordenadas de menor a mayor según su edad. Por
cada persona, mostrar: nombre, edad y equipo. */
app.get("/members/list", (req, res) => {
	const total: number = req.query.total ? Number(req.query.total) : 100;
	// const order: string = req.query.order ? req.query.order : 'age:ASC';
	const maritalStatus: string = req.query.maritalStatus;
	const education: string = req.query.education;

	const list: any[] = members.filter((member: Member) => {
		return (member.maritalStatusIs(maritalStatus) && member.hasDegree(education));
	}).sort((a: Member, b: Member) => {
		return (a.memberAge > b.memberAge) ? 1 : ((b.memberAge > a.memberAge) ? -1 : 0);
	})
		.slice(0, total)
		.map((member: Member) => {
			return {
				name: member.memberName,
				age: member.memberAge,
				team: member.memberTeam
			}
		});

	res.status(200);
	res.send({
		metadata: {
			total: list.length
		},
		data: list
	});
});

/* Un listado con los 5 nombres más comunes entre los hinchas de River. */
app.get("/members/commonNames/:team", (req, res) => {
	const total: number = req.query.total ? Number(req.query.total) : 5;
	const team: string = req.params.team;

	const names: any[] = members.filter((member: Member) => {
		return member.isFan(team);
	}).reduce((p: any, currentMember: Member) => {
		const name: string = currentMember.memberName;
		if (!p.hasOwnProperty(name)) {
			p[name] = 0;
		}
		p[name]++;
		return p;
	}, {});

	let response: any[] = [];
	for (const name in names) {
		if (names.hasOwnProperty(name)) {
			const value = names[name];
			response.push({ name, count: value });
		}
	}

	response = response.sort((a: any, b: any) => {
		return (a.count < b.count) ? 1 : (b.count < a.count ? -1 : 0);
	}).slice(0, total);

	res.status(200);
	res.send(response);
});

/* Un listado, ordenado de mayor a menor según la cantidad de
socios, que enumere, junto con cada equipo, el promedio de edad
de sus socios, la menor edad registrada y la mayor edad registrada. */
app.get("/members/summarize", (req, res) => {
	let response: any[] = [];
	const summary: any = {};
	for (const member of members) {
		if (!summary[member.memberTeam]) {
			summary[member.memberTeam] = {
				totalMembers: 0,
				age: {
					average: 0,
					min: member.memberAge,
					max: member.memberAge
				}
			}
		}
		summary[member.memberTeam].totalMembers++;
		summary[member.memberTeam].age.average += member.memberAge
		summary[member.memberTeam].age.min = (member.memberAge < summary[member.memberTeam].age.min) ? member.memberAge : summary[member.memberTeam].age.min;
		summary[member.memberTeam].age.max = (member.memberAge > summary[member.memberTeam].age.max) ? member.memberAge : summary[member.memberTeam].age.max;
	}

	for (const key in summary) {
		if (summary.hasOwnProperty(key)) {
			const element = summary[key];
			element.age.average = element.age.average / element.totalMembers;
			element.teamName = key
			response.push(element);
		}
	}

	response = response.sort((a: any, b: any) => {
		return (a.totalMembers < b.totalMembers) ? 1 : (b.totalMembers < a.totalMembers ? -1 : 0);
	})

	res.status(200);
	res.send(response);
});

// start the Express server
app.listen(LISTEN_PORT, () => {
	// tslint:disable-next-line:no-console
	console.log(`server started at http://localhost:${LISTEN_PORT}`);
});
