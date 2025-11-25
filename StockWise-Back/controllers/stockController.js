const {
  getAllStockService,
  createProductStockService,
  updateProductStockService,
  deleteStockByIdService,
} = require("../services/stockService");
const { CONTENT_TYPE, TYPE_JSON } = require("../src/const").constantes;

const getAllStock = async (req, res) => {
  try {
    res.setHeader(CONTENT_TYPE, TYPE_JSON);
    res.status(200).send(await getAllStockService());
  } catch (error) {
    res.status(404).send("Recurso no encontrado");
    throw Error("Error en CONTROLLER - getAllStock - " + error);
  }
};

const createProductStock = async (req, res) => {
  try {
    console.log("CONTROLLER - createProductStock", req);

    const stockInfo = req.body;
    const newProductStock = await createProductStockService(stockInfo);

    res.setHeader(CONTENT_TYPE, TYPE_JSON);
    res.status(200).send(JSON.stringify(newProductStock));
  } catch (error) {
    res.status(500).send({
      code: 500,
      message: "Error al crear el stock del producto",
    });
    throw Error("Error 500");
  }
};

const updateProductStock = async (req, res) => {
  try {
    const id = req.params.id;
    const prodStock = req.body;
    const updatedProductStock = await updateProductStockService(id, prodStock);

    res.setHeader(CONTENT_TYPE, TYPE_JSON);
    res.status(200).send(JSON.stringify(updatedProductStock));
  } catch (error) {
    res.status(404).send("Recurso no encontrado");
    throw Error("Error en CONTROLLER - updateProductStock - " + error);
  }
};

const deleteStockById = async (req, res) => {
  try {
    console.log("CONTROLLER - deleteStockRecord");

    const idStock = req.params.id;
    const stockRecord = await deleteStockByIdService(idStock);

    if (stockRecord.length === 0) {
      return res
        .status(404)
        .send(`No se puede eliminar el registro de stock con id:${idStock}`);
    }

    res.setHeader(CONTENT_TYPE, TYPE_JSON);
    res.status(200).send(JSON.stringify(stockRecord));
  } catch (error) {
    res.status(500).send({
      code: 500,
      message: "Error al borrar el stock",
    });
    throw Error("Error 500");
  }
};

module.exports = {
  getAllStock,
  createProductStock,
  updateProductStock,
  deleteStockById,
};
