const { Router } = require("express");
const getCourseHandlers = require("../handlers/course/course.handlers");


const courseRouter = Router();

courseRouter.get("/", getCourseHandlers);

module.exports = courseRouter;