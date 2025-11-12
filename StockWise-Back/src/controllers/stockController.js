const {
  getAllStockService
} = require("../services/stockService");
const { CONTENT_TYPE, TYPE_JSON } = require("../config/const").constantes;

exports.readStock = async (req, res) => {
  try {
    res.setHeader(CONTENT_TYPE, TYPE_JSON);
    res.status(200).send(await getAllStockService());
  } catch (error) {
    res.status(404).send("Recurso no encontrado");
    throw Error("Error en CONTROLLER - getAllFrontendLanguajes - " + error);
  }
};