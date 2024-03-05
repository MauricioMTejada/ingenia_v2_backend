const { Router } = require("express");

const router = Router();

router.get('/', (req, res) => {
    const htmlResponse =
    `<html>
        <head>
            <title>Estoy</title>
        </head>
        <body>
         <h1>Estoy en 'routes/index.routes.js'</h1>
         </body>
         </html>`;

    res.send(htmlResponse);
  });