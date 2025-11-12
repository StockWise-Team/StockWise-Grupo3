const express = require("express");
const {
  getAllStock,
  updateProductStock,
  deleteStockById,
  createProductStock
} = require("../controllers/stockController");
const stockRouter = express();

stockRouter.get("/", getAllStock);
stockRouter.put("/:id", updateProductStock);
stockRouter.delete("/:id", deleteStockById)
stockRouter.post("/:id", createProductStock)

module.exports = stockRouter;
