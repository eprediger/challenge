import express from "express";
var multer = require('multer');
var upload = multer({ dest: 'uploads/' });

const LISTEN_PORT = 8080; // default port to listen

const app = express();

// define a route handler for the default home page
app.get("/", (req, res) => {
	res.send("Hello world!");
});

app.post("/upload", (req, res) => {
	res.send()
});

// start the Express server
app.listen(LISTEN_PORT, () => {
	// tslint:disable-next-line:no-console
	console.log(`server started at http://localhost:${LISTEN_PORT}`);
});
