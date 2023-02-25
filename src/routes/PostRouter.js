const { Router } = require("express");
const { createRazeHandler } = require("../handlers/postHandlers");
const createValidation = require("../validates/dogsValidate");

const PostRouter = Router();

PostRouter.post("/", createValidation, createRazeHandler);

module.exports = PostRouter;
