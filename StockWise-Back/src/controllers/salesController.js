const { createSaleService } = require("../services/salesServices");
const { CONTENT_TYPE, TYPE_JSON } = require("../config/const").constantes;

exports.createSale = async (req, res) => {
  try {
    res.setHeader(CONTENT_TYPE, TYPE_JSON);
    const saleData = req.body;
    const result = await createSaleService(saleData);
    res.status(201).send(result);
  } catch (error) {
    console.error("Error en CONTROLLER - createSale - " + error);
    res.status(400).send({ error: "Error al crear la venta", message: error.message });
  }
};
