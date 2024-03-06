
const { Router } = require("express");

const route_test = Router();

route_test.get('/', (req, res) => {
    const htmlResponse =
    `<html>
        <head>
            <title>Courses</title>
        </head>
        <body>
         <h1>Estoy en 'test_route'</h1>
         </body>
         </html>`;

    res.send(htmlResponse);
  });

  module.exports = route_test;