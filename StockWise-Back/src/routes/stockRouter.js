const express = require("express");
const {
  readStock
} = require("../controllers/stockController");
const stockRouter = express();

stockRouter.get("/", readStock);

module.exports = stockRouter;
