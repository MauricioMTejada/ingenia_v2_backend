// importations
	require("dotenv").config();
	const express = require("express");
	const bodyParser = require("body-parser");
	const morgan = require("morgan");
	const cors = require("cors");
	const router = require("./src/routes/test_index.routes.js");
	const { Result } = require("express-validator");
	// const { sequelize } = require("./src/database.js");
	const { sequelize, } = require("./src/test.database.route/database_test.js");
	const { pool, } = require("./src/test.database.route/database_test_(without_sequelize).js");

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

async function startServer() {
	try {
		await sequelize.sync({ force: true }); // Para resetear DB: "force: true"
		console.log(`Database & tables created`);
		server.listen(port, () => {
			console.log(`Server is listening on port ${port}`);
		});
	} catch (error) {
		console.error(error);
	}
}

startServer(); // |=> comentar para probar la BD


// Test - Base de datos sin Sequelize
async function test_database() {
	try {
		//   await sequelize.sync({ force: true }); // Para resetear la base de datos: force: true
		//   console.log(`Database & tables created`);

		server.get("/ping", async (req, res) => {
			const result = await pool.query("SELECT NOW()");
			return res.json(result.rows[0].now);
		});

		server.listen(port, () => {
			console.log(`Test Database without sequelize`);
			console.log(`Server is listening on port ${port}`);
		});
	} catch (error) {
		console.error(error);
	}
}

// test_database();	// |=> descomentar para probar la BD
