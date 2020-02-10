class Member {
	private name: string;
	private age: number;
	private team: string;
	private maritalStatus: string;
	private education: string;

	constructor(name: string, age: string, team: string, maritalStatus: string, education: string) {
		this.name = name;
		this.age = Number(age);
		this.team = team;
		this.maritalStatus = maritalStatus;
		this.education = education;
	}

	get memberName(): string {
		return this.name;
	}

	get memberAge(): number {
		return this.age;
	}

	get memberTeam(): string {
		return this.team;
	}

	public isFan(queryTeam: string): boolean {
		return this.team == queryTeam;
	}

	maritalStatusIs(maritalStatus: string) {
		return this.maritalStatus == maritalStatus;
	}

	hasDegree(education: string) {
		return this.education == education;
	}
};

export default Member;
