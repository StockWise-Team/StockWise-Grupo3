const { getAllProductsRepository } = require("../repositories/productsRepository");

exports.getAllProductsService = async () => {
  try {
    return await getAllProductsRepository()
  } catch (error) {
    res.status(404).send("Recurso no encontrado");
    throw Error("Error en Service - getAllProductsService - " + error);
  }
};
