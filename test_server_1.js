// 	Nombre original del archivo:
// 	test_server_1.js

// importations
	require("dotenv").config();
	const express = require("express");
	const bodyParser = require("body-parser");
	const morgan = require("morgan");
	const cors = require("cors");
	const pg = require("pg");
	const { cyan } = require('colorette');

// constants
	const port = process.env.PORT || 3002;
	const server = express();
	const corsOptions = { origin: "*" };

// 'use'
	server.use(cors(corsOptions));
	server.use(bodyParser.json({ limit: "10mb", extended: true }));
	server.use(bodyParser.urlencoded({ limit: "10mb", extended: false }));
	server.use(morgan("dev"));

// print in console the request
server.use((req, res, next) => {
	console.log(`Request: ${req.method} ${req.url}`);
	// console.log(`Body: ${req.body}`);
	console.log(req.body);
	// console.log(req);
	next();
});


// Test - Base de datos sin Sequelize

const pool = new pg.Pool({
	connectionString: process.env.DATABASE_URL_EXTERNAL,
	ssl: true // comment: in line DB - discomment in local DB
  });

server.get("/", (req, res) => {
	const htmlResponse = `<html>
    <head>
    <title>Test</title>
    </head>
    <body>
    <h1>Estoy en la raiz</h1>
    </body>
    </html>`;

	console.log(`Routes loaded`);
	res.send(htmlResponse);
});

server.get("/ping", async (req, res) => {
	const result = await pool.query("SELECT NOW()");
	return res.json(result.rows[0].now);
});

server.listen(port, () => {
    // Utiliza chalk para imprimir el mensaje en otro color
    console.log(cyan('Test Database without sequelize'));
    console.log(`Server is listening on port ${port}`);
});
