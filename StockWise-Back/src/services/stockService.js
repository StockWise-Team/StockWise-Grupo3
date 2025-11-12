const {
  getAllStockRepository,
  createProductStockRepository,
  updateProductStockRepository,
  deleteStockByIdRepository
} = require("../repositories/stockRepository");

const getAllStockService = async () => {
  try {
    return await getAllStockRepository();
  } catch (error) {
    res.status(404).send("Recurso no encontrado");
    throw Error("Error en Service - getAllStockService - " + error);
  }
};

const createProductStockService = async (stockInfo) => {
  try {
    console.log(`SERVICE - createProductStockService - nuevo stock de producto: ${stockInfo}`);
    return await createProductStockRepository(stockInfo);
  } catch (error) {
    res.status(404).send("Recurso no encontrado");
    throw Error("Error en Service - createProductStockService - " + error);
    
  }
} 

const updateProductStockService = async (id, productStock) => {
    try {
      console.log(
        `SERVICE - updateProductStockService - stock de producto actualizado: ${id} - ${product}`
      );
      return await updateProductStockRepository(id, productStock);
    } catch (error) {
      console.log("Error en SERVICE - updateProductService" + error);
      throw Error("Error en SERVICE - updateProductService" + error);
    }
}

const deleteStockByIdService = async (id) => {
   try {
      console.log(`SERVICE - deleteStockByIdService - id: ${id}`);
      return await deleteStockByIdRepository(id);
    } catch (error) {
      console.log("Error en SERVICE - deleteStockByIdService" + error);
      throw Error("Error en SERVICE - deleteStockByIdService" + error);
    }
}


module.exports = {
  getAllStockService,
  createProductStockService,
  updateProductStockService,
  deleteStockByIdService
}