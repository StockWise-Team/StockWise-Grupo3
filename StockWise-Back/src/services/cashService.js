const { 
  openCashRepository, 
  getOpenCashRepository, 
  getTotalSalesOpenCashRepository, 
  closeCashRepository, 
  getCashHistoryRepository 
} = require("../repositories/cashRepository");

// Abre una nueva caja verificando que no haya otra abierta
exports.openCashService = async (idEmpleado) => {
  try {
    const openCash = await getOpenCashRepository();
    
    if (openCash) {
      throw new Error("Ya existe una caja abierta. Debe cerrar la caja actual antes de abrir una nueva.");
    }

    const result = await openCashRepository(idEmpleado);
    
    return {
      success: true,
      message: "Caja abierta exitosamente",
      data: result
    };
  } catch (error) {
    throw Error("Error en Service - openCashService - " + error.message);
  }
};

// Obtiene el estado de la caja y calcula el total de ventas
exports.getCashStatusService = async () => {
  try {
    const openCash = await getOpenCashRepository();
    
    if (!openCash) {
      return {
        success: true,
        cashOpen: false,
        message: "No hay caja abierta"
      };
    }

    const salesData = await getTotalSalesOpenCashRepository();
    
    return {
      success: true,
      cashOpen: true,
      data: {
        id: openCash.ID,
        fechaApertura: openCash.FECHA_APERTURA,
        idEmpleado: openCash.ID_EMPLEADO,
        totalVentas: salesData.TOTAL_VENTAS,
        cantidadVentas: salesData.CANTIDAD_VENTAS
      }
    };
  } catch (error) {
    throw Error("Error en Service - getCashStatusService - " + error.message);
  }
};

// Cierra la caja actual guardando el total y actualizando el empleado
exports.closeCashService = async (idEmpleado) => {
  try {
    const openCash = await getOpenCashRepository();
    
    if (!openCash) {
      throw new Error("No hay caja abierta para cerrar");
    }

    const salesData = await getTotalSalesOpenCashRepository();
    
    const result = await closeCashRepository(
      openCash.ID, 
      salesData.TOTAL_VENTAS,
      idEmpleado
    );

    return {
      success: true,
      message: "Caja cerrada exitosamente",
      data: {
        ...result,
        cantidadVentas: salesData.CANTIDAD_VENTAS,
        fechaApertura: openCash.FECHA_APERTURA
      }
    };
  } catch (error) {
    throw Error("Error en Service - closeCashService - " + error.message);
  }
};

// Obtiene el historial de todas las cajas cerradas
exports.getCashHistoryService = async () => {
  try {
    const history = await getCashHistoryRepository();
    
    return {
      success: true,
      data: history
    };
  } catch (error) {
    throw Error("Error en Service - getCashHistoryService - " + error.message);
  }
};