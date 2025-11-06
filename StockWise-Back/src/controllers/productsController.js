const { getAllProductsService } = require("../services/productsServices")

exports.readProducts = async (req, res) =>{
  try {
    res.status(200).send(await (getAllProductsService()))
  } catch (error) {
    
  }
}