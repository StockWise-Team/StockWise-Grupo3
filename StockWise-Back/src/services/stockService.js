const {
  getAllStockRepository,
} = require("../repositories/stockRepository");

exports.getAllStockService = async () => {
  try {
    return await getAllStockRepository();
  } catch (error) {
    res.status(404).send("Recurso no encontrado");
    throw Error("Error en Service - getAllStockService - " + error);
  }
};