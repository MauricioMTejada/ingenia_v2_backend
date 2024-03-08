const { Router } = require("express");

const wellcome = Router();

wellcome.get("/", (req, res) => {
	const htmlResponse =
        `<html>
            <head>
                <title>API Ingenia</title>
            </head>

            <body>
                <h1>Bienvenido. API de Ingenia</h1>
            </body>
        </html>`;

	res.send(htmlResponse);
});

module.exports = wellcome;
