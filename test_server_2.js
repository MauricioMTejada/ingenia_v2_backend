// 	Nombre original del archivo:
// 	test_server_2.js

// importations
	require("dotenv").config();
	const express = require("express");
	const bodyParser = require("body-parser");
	const morgan = require("morgan");
	const cors = require("cors");
	const router = require("./src/routes/test_index.routes.js");
	const { sequelize, } = require("./src/test.database.route/database_test.js");
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
	server.use("/", router);

// print in console the request
	server.use((req, res, next) => {
		console.log(`Request: ${req.method} ${req.url}`);
		// console.log(`Body: ${req.body}`);
		console.log(req.body);
		// console.log(req);
		next();
	});


// Test - Base de datos con Sequelize

	sequelize.sync({ force: true }); // Para resetear DB: "force: true"
	console.log(`Database & tables created`);
	server.listen(port, () => {
		console.log(cyan('Test Database with sequelize'));
		console.log(`Server is listening on port ${port}`);
	});
