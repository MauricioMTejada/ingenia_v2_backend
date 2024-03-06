const { Router } = require("express");

const router = Router();

const test_route = require("../test.database.route/route_test");
const { databaseTest, } = require("../test.database.route/database_test(with_sequelize)");

router.get("/", (req, res) => {
	const htmlResponse = `<html>
    <head>
    <title>Estoy</title>
    </head>
    <body>
    <h1>Estoy en la raiz</h1>
    </body>
    </html>`;

	console.log(`Routes loaded`);
	res.send(htmlResponse);
});

router.use("/test_route", test_route);
router.use("/db_test", databaseTest);

module.exports = router;
