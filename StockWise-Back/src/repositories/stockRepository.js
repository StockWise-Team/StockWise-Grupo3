const { getConnectionSQL } = require("../database/connection");
const {
  getAllStock,
} = require("../database/queries");
const sql = require("mssql");

exports.getAllStockRepository = async () => {
  const pool = await getConnectionSQL();

  try {
    const result = await pool.request().query(getAllStock);

    return result.recordset;

  } catch (error) {
    console.log("Error en REPOSITORY - getStockRepository - " + error);
    throw Error("Error en REPOSITORY - getStockRepository - " + error);
  } finally {
    pool.close();
  }
};