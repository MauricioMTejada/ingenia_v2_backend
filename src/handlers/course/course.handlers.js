
const { Router } = require("express");

const getCourseHandlers = Router();

getCourseHandlers.get('/', (req, res) => {
    const htmlResponse =
    `<html>
        <head>
            <title>Courses</title>
        </head>
        <body>
         <h1>Estoy en 'handlers/course/course.handlers.js'</h1>
         </body>
         </html>`;

    res.send(htmlResponse);
  });

  module.exports = getCourseHandlers;