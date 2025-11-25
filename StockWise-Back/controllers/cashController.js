const { 
  openCashService, 
  getCashStatusService, 
  closeCashService, 
  getCashHistoryService 
} = require("../services/cashService");
const { CONTENT_TYPE, TYPE_JSON } = require("../src/const").constantes;

exports.openCash = async (req, res) => {
  try {
    res.setHeader(CONTENT_TYPE, TYPE_JSON);
    
    const idEmpleado = req.body.idEmpleado || 6;
    
    const result = await openCashService(idEmpleado);
    res.status(201).send(result);
  } catch (error) {
    console.error("Error en CONTROLLER - openCash - " + error);
    res.status(400).send({ 
      success: false,
      error: "Error al abrir caja", 
      message: error.message 
    });
  }
};

exports.getCashStatus = async (req, res) => {
  try {
    res.setHeader(CONTENT_TYPE, TYPE_JSON);
    
    const result = await getCashStatusService();
    res.status(200).send(result);
  } catch (error) {
    console.error("Error en CONTROLLER - getCashStatus - " + error);
    res.status(500).send({ 
      success: false,
      error: "Error al obtener estado de caja", 
      message: error.message 
    });
  }
};

exports.closeCash = async (req, res) => {
  try {
    res.setHeader(CONTENT_TYPE, TYPE_JSON);
    
    const idEmpleadoCierre = req.body.idEmpleado;
    
    const result = await closeCashService(idEmpleadoCierre);
    res.status(200).send(result);
  } catch (error) {
    console.error("Error en CONTROLLER - closeCash - " + error);
    res.status(400).send({ 
      success: false,
      error: "Error al cerrar caja", 
      message: error.message 
    });
  }
};

exports.getCashHistory = async (req, res) => {
  try {
    res.setHeader(CONTENT_TYPE, TYPE_JSON);
    
    const result = await getCashHistoryService();
    res.status(200).send(result);
  } catch (error) {
    console.error("Error en CONTROLLER - getCashHistory - " + error);
    res.status(500).send({ 
      success: false,
      error: "Error al obtener historial de caja", 
      message: error.message 
    });
  }
};