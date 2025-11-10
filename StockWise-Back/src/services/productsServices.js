const {
  getAllProductsRepository,
  getProductByIdRepository,
  deleteProductRepository,
  createProductRepository,
  updateProductRepository,
} = require("../repositories/productsRepository");

exports.getAllProductsService = async () => {
  try {
    return await getAllProductsRepository();
  } catch (error) {
    //res.status(404).send("Recurso no encontrado");
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

exports.deleteProductService = async (id) => {
  try {
    console.log(`SERVICE - deleteProductService - id a borrar: ${id}`);
    return await deleteProductRepository(id);
  } catch (error) {
    console.log("Error en SERVICE - deleteProductService" + error);
    throw Error("Error en SERVICE - deleteProductService" + error);
  }
};

exports.createProductService = async (product) => {
  try {
    console.log(`SERVICE - createProductService - nuevo producto: ${product}`);
    return await createProductRepository(product);
  } catch (error) {
    console.log("Error en SERVICE - createProductService" + error);
    throw Error("Error en SERVICE - createProductService" + error);
  }
};

exports.updateProductService = async (id, product) => {
  try {
    console.log(
      `SERVICE - updateProductService - producto actualizado: ${id} - ${product}`
    );
    return await updateProductRepository(id, product);
  } catch (error) {
    console.log("Error en SERVICE - updateProductService" + error);
    throw Error("Error en SERVICE - updateProductService" + error);
  }
};
