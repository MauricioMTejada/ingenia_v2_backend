require("dotenv").config();

const express = require("express");

const bodyParser = require("body-parser");
const morgan = require("morgan");
const cors = require("cors");
const pg = require("pg");

const port = process.env.PORT || 3002;

const router = require("./src/routes/index.routes.js");
const { Result } = require("express-validator");

// const { sequelize } = require("./src/database.js");

const server = express();

const pool = new pg.Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: true
})
const corsOptions = {
  origin: "*",
};

server.use(cors(corsOptions));
server.use(bodyParser.json({ limit: "10mb", extended: true }));
server.use(bodyParser.urlencoded({ limit: "10mb", extended: false }));
server.use(morgan("dev"));

// Imprimo en consola el pedido:
/*   server.use((req, res, next) => {
    console.log(`Request: ${req.method} ${req.url}`);
    // console.log(req);
    next(); }); */

server.use("/", router);

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

server.get('/ping', async (req, res) => {
  const result = await pool.query('SELECT NOW()')
  return res.json(result.rows[0].now)
})

  server.listen(port, () => {
    console.log(`Server running on port ${port}`);
  });