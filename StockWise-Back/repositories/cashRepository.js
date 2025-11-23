const { getConnectionSQL } = require("../database/connection");
const {
  openCashSQL,
  getOpenCashSQL,
  getTotalSalesOpenCashSQL,
  closeCashSQL,
  getCashHistorySQL,
} = require("../database/queries");
const sql = require("mssql");

// Abre una nueva caja registrando el empleado y la fecha
exports.openCashRepository = async (idEmpleado) => {
  const pool = await getConnectionSQL();
  try {
    const fechaApertura = new Date();

    await pool
      .request()
      .input("idEmpleado", sql.Int, idEmpleado)
      .input("fechaApertura", sql.DateTime, fechaApertura)
      .query(openCashSQL);

    return {
      success: true,
      message: "Caja abierta exitosamente",
      fechaApertura: fechaApertura,
    };
  } catch (error) {
    console.log("Error en REPOSITORY - openCashRepository - " + error);
    throw Error("Error en REPOSITORY - openCashRepository - " + error);
  } finally {
    pool.close();
  }
};

// Obtiene la caja que está abierta actualmente
exports.getOpenCashRepository = async () => {
  const pool = await getConnectionSQL();
  try {
    const result = await pool.request().query(getOpenCashSQL);
    return result.recordset[0] || null;
  } catch (error) {
    console.log("Error en REPOSITORY - getOpenCashRepository - " + error);
    throw Error("Error en REPOSITORY - getOpenCashRepository - " + error);
  } finally {
    pool.close();
  }
};

// Obtiene el total de ventas de la caja abierta
exports.getTotalSalesOpenCashRepository = async () => {
  const pool = await getConnectionSQL();
  try {
    const result = await pool.request().query(getTotalSalesOpenCashSQL);
    return result.recordset[0] || { TOTAL_VENTAS: 0, CANTIDAD_VENTAS: 0 };
  } catch (error) {
    console.log(
      "Error en REPOSITORY - getTotalSalesOpenCashRepository - " + error
    );
    throw Error(
      "Error en REPOSITORY - getTotalSalesOpenCashRepository - " + error
    );
  } finally {
    pool.close();
  }
};

// Cierra la caja guardando el total y actualizando el empleado
exports.closeCashRepository = async (idCaja, montoFinal, idEmpleado) => {
  const pool = await getConnectionSQL();
  try {
    const fechaCierre = new Date();

    await pool
      .request()
      .input("idCaja", sql.Int, idCaja)
      .input("fechaCierre", sql.DateTime, fechaCierre)
      .input("montoFinal", sql.Decimal(10, 2), montoFinal)
      .input("idEmpleado", sql.Int, idEmpleado)
      .query(closeCashSQL);

    return {
      success: true,
      message: "Caja cerrada exitosamente",
      fechaCierre: fechaCierre,
      montoFinal: montoFinal,
    };
  } catch (error) {
    console.log("Error en REPOSITORY - closeCashRepository - " + error);
    throw Error("Error en REPOSITORY - closeCashRepository - " + error);
  } finally {
    pool.close();
  }
};

// Obtiene el historial de todas las cajas cerradas
exports.getCashHistoryRepository = async () => {
  const pool = await getConnectionSQL();
  try {
    const result = await pool.request().query(getCashHistorySQL);
    return result.recordset;
  } catch (error) {
    console.log("Error en REPOSITORY - getCashHistoryRepository - " + error);
    throw Error("Error en REPOSITORY - getCashHistoryRepository - " + error);
  } finally {
    pool.close();
  }
};
