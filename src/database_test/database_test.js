
// This file is for testing database
// discomment in 'index.js' file lines:
// - test database
// - test database - listen server

const pg = require("pg");

const pool = new pg.Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: true // comment: in line DB - discomment in local DB
});

module.exports = { pool };