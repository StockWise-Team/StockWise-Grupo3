const express = require("express");
const {
  readProducts,
  readProductById,
  deleteProduct,
  createProduct,
  updateProduct,
} = require("../controllers/productsController");
const productsRouter = express();

productsRouter.get("/", readProducts);
productsRouter.get("/:id", readProductById);
productsRouter.delete("/:id", deleteProduct);
productsRouter.post("/", createProduct);
productsRouter.put("/:id", updateProduct);

module.exports = productsRouter;
