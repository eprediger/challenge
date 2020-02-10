import express from "express";
import multer from 'multer';
import * as fs from 'fs';
import * as csv from 'fast-csv';

import Member from "./model/Member";

const LISTEN_PORT: number = 8080; // default port to listen
const HEADERS: string[] = ['name', 'age', 'team', 'maritalStatus', 'education'];
const DELIMITER: string = ";";

const upload = multer({ dest: 'tmp/csv/' });
const app = express();

let members: Member[] = [];

// Subida archivo
app.post('/upload-csv', upload.single('file'), (req, res) => {
	fs.createReadStream(req.file.path, 'utf8')
		.pipe(csv.parse({ headers: HEADERS, delimiter: DELIMITER }))
		.on('error', (error: any) => {
			console.error(error);
			res.status(500);
			res.send(error);
		})
		.on('data', (row: any) => {
			let newMember: Member = new Member(row.name, row.age, row.team, row.maritalStatus, row.education);
			members.push(newMember);
		})
		.on('end', (rowCount: number) => {
			res.status(200);
			res.send(`Parsed ${rowCount} rows`);;
		});
});

// Cantidad total de personas registradas.
app.get("/members/total", (req, res) => {
	res.status(200);
	res.send({ total: members.length });
});

/* El promedio de edad de los socios de Racing. */
app.get("/members/averageAge", (req, res) => {
	let queryTeam: string = req.query.team;

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
	res.send({ averageAge: averageAge });
});

/* Un listado con las 100 primeras personas casadas, con estudios
Universitarios, ordenadas de menor a mayor según su edad. Por
cada persona, mostrar: nombre, edad y equipo. */
app.get("/members/list", (req, res) => {
	let total: number = req.query.total ? Number(req.query.total) : 100;
	let order: string = req.query.order ? req.query.order : 'age:ASC';
	let maritalStatus: string = req.query.maritalStatus;
	let education: string = req.query.education;

	let list: any[] = members.filter((member: Member) => {
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
app.get("/members/commonNames", (req, res) => {
	let total: number = req.query.total ? Number(req.query.total) : 5;
	let team: string = req.query.team;

	let names: any[] = members.filter((member: Member) => {
		return member.isFan(team);
	})/* .reduce((result: any, currentMember: Member) => {
		if (currentMember.memberName in  ) {

		}
		(result[currentMember.memberName] = result[currentMember.memberName] || []).push(currentMember);
		return result;
	}, {}) */;

	res.status(200);
	res.send(names);
});

/* Un listado, ordenado de mayor a menor según la cantidad de
socios, que enumere, junto con cada equipo, el promedio de edad
de sus socios, la menor edad registrada y la mayor edad registrada. */
app.get("/members/summarize", (req, res) => {
	let summary: any[] = [];

	// members.

	res.status(200);
	res.send(summary);
});

// start the Express server
app.listen(LISTEN_PORT, () => {
	// tslint:disable-next-line:no-console
	console.log(`server started at http://localhost:${LISTEN_PORT}`);
});
