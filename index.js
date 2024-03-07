// 	Nombre original del archivo:
// 	server_production.js

// importations
	require("dotenv").config();
	const express = require("express");
	const bodyParser = require("body-parser");
	const morgan = require("morgan");
	const cors = require("cors");
	const { cyan } = require('colorette');
	const { sequelize, } = require("./src/database");
	const router = require("./src/routes/index.routes");

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

// print errors in console
	// server.use((err, req, res, next) => {
	//   console.error(err);
	//   res.status(500).send({ error: err.message });
	// });


// Base de Datos:
	sequelize.sync({ alter: true }); // Para resetear DB: "force: true"
		console.log(`Database & tables created`);
		server.listen(port, () => {
			console.log(cyan('Server Ingenia v2'));
			console.log(`Server is listening on port ${port}`);
		});
