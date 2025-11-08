const {
  getAllProductsRepository,
  getProductByIdRepository,
} = require("../repositories/productsRepository");

exports.getAllProductsService = async () => {
  try {
    return await getAllProductsRepository();
  } catch (error) {
    res.status(404).send("Recurso no encontrado");
    throw Error("Error en Service - getAllProductsService - " + error);
  }
};

exports.getProductByIdService = async (id) => {
  try {
    console.log(`SERVICE - getProductByIdService - id: ${id}`);
    return await getProductByIdRepository(id);
  } catch (error) {
    console.log("Error en SERVICE - getProductByIdService" + error);
    throw Error("Error en SERVICE - getProductByIdService" + error);
  }
};
