const { Router } = require("express");
const {
  getDogsHandlers,
  getTempDogHandlers,
  getDogsHandlersId,
} = require("../handlers/dogHandlers");

const DogsRouters = Router();

DogsRouters.get("/",getDogsHandlers);

DogsRouters.get("/temperaments", getTempDogHandlers);

DogsRouters.get("/:id", getDogsHandlersId);

module.exports = DogsRouters;
