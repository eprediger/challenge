abstract class Constants {
	constructor() { }
	// Equipos
	public static BOCA: string = "Boca";
	public static ESTUDIANTES: string = "Estudiantes";
	public static GIMNASIA_LP: string = "Gimnasia LP";
	public static HURACÁN: string = "Hurac�n";
	public static INDEPENDIENTE: string = "Independiente";
	public static NEWELLS: string = "Newells";
	public static RACING: string = "Racing";
	public static RIVER: string = "River";
	public static ROSARIO_CENTRAL: string = "Rosario Central";
	public static SAN_LORENZO: string = "San Lorenzo";
	public static VELEZ: string = "Velez";

	public static EQUIPOS: string[] = [
		Constants.BOCA,
		Constants.ESTUDIANTES,
		Constants.GIMNASIA_LP,
		Constants.HURACÁN,
		Constants.INDEPENDIENTE,
		Constants.NEWELLS,
		Constants.RACING,
		Constants.RIVER,
		Constants.ROSARIO_CENTRAL,
		Constants.SAN_LORENZO,
		Constants.VELEZ];

	// Estado Civil
	public static SOLTERO: string = "Soltero";
	public static CASADO: string = "Casado";

	public static ESTADO_CIVIL: string[] = [Constants.SOLTERO, Constants.CASADO];

	// Nivel educativo
	public static SECUNDARIO: string = "Secundario";
	public static TERCIARIO: string = "Terciario";
	public static UNIVERSITARIO: string = "Universitario";

	public static EDUCACION: string[] = [
		Constants.SECUNDARIO,
		Constants.TERCIARIO,
		Constants.UNIVERSITARIO];
}

export default Constants;
