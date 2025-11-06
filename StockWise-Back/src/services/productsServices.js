const { getAllProductsRepository } = require("../repositories/productsRepository");

exports.getAllProductsService = async () => {
  try {
    return await getAllProductsRepository()
  } catch (error) {
    
  }
};
