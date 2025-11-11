const { createSaleService, getAllSalesService, getTodaySalesService } = require("../services/salesServices");
const { CONTENT_TYPE, TYPE_JSON } = require("../config/const").constantes;

// Crea una nueva venta con los productos recibidos
exports.createSale = async function(req, res) {
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

// Obtiene todas las ventas registradas
exports.getAllSales = async function(req, res) {
  try {
    res.setHeader(CONTENT_TYPE, TYPE_JSON);
    const sales = await getAllSalesService();
    res.status(200).send(sales);
  } catch (error) {
    console.error("Error en CONTROLLER - getAllSales - " + error);
    res.status(500).send({ error: "Error al obtener las ventas", message: error.message });
  }
};

// Obtiene las ventas de la caja actual
exports.getTodaySales = async function(req, res) {
  try {
    res.setHeader(CONTENT_TYPE, TYPE_JSON);
    const sales = await getTodaySalesService();
    res.status(200).send(sales);
  } catch (error) {
    console.error("Error en CONTROLLER - getTodaySales - " + error);
    res.status(500).send({ error: "Error al obtener las ventas de hoy", message: error.message });
  }
};
