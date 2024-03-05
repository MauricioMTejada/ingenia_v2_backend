
// importations
	require("dotenv").config();
	const express = require("express");
	const bodyParser = require("body-parser");
	const morgan = require("morgan");
	const cors = require("cors");
	// const pg = require("pg");
	const router = require("./src/routes/index.routes.js");
	const { Result } = require("express-validator");
	// const { sequelize } = require("./src/database.js");
	const { pool } = require("./src/database_test/database_test.js")

// constants
	const port = process.env.PORT || 3002;
	const server = express();
	const corsOptions = { origin: "*", };

// 'use'
	server.use(cors(corsOptions));
	server.use(bodyParser.json({ limit: "10mb", extended: true }));
	server.use(bodyParser.urlencoded({ limit: "10mb", extended: false }));
	server.use(morgan("dev"));
	server.use("/", router);

// print in console the request
	// server.use((req, res, next) => {
	// 	console.log(`Request: ${req.method} ${req.url}`);
	// 	console.log(req);
	// 	next();
	// });

// print errors in console
	// server.use((err, req, res, next) => {
	//   console.error(err);
	//   res.status(500).send({ error: err.message });
	// });

// sequelize
//   .sync({ alter: true })
//   // .sync({ force: true }) // para resetear la base de datos Force: true
//   .then(() => {
//     console.log(`Database & tables created`);
//     server.listen(port, () => {
//       console.log(`Server is listening on port ${port}`);
//     });
//   })
//   .catch((err) => {
//     console.log(err);
//   });

// test database
	server.get('/ping', async (req, res) => {
		const result = await pool.query('SELECT NOW()')
		return res.json(result.rows[0].now)
	})

// test database - listen server
	server.listen(port, () => {
		console.log(`Server running on port ${port}`);
	});