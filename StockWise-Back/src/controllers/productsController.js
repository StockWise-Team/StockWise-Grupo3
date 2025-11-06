const { getAllProductsService } = require("../services/productsServices");
const { CONTENT_TYPE, TYPE_JSON } = require("../config/const").constantes;

exports.readProducts = async (req, res) => {
  try {
    res.setHeader(CONTENT_TYPE, TYPE_JSON);
    res.status(200).send(await getAllProductsService());
  } catch (error) {
    res.status(404).send("Recurso no encontrado");
    throw Error("Error en CONTROLLER - getAllFrontendLanguajes - " + error);
  }
};
