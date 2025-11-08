const { getConnectionSQL } = require("../database/connection");
const { getAllProductSQL, getProductByIdSQL } = require("../database/queries");
const sql = require("mssql");

exports.getAllProductsRepository = async () => {
  const pool = await getConnectionSQL();
  try {
    const result = await pool.request().query(getAllProductSQL);

    return JSON.stringify(result.recordset);
  } catch (error) {
    console.log("Error en REPOSITORY - getAllProductsRepository - " + error);
    throw Error("Error en REPOSITORY - getAllProductsRepository - " + error);
  } finally {
    pool.close();
  }
};

exports.getProductByIdRepository = async (id) => {
  const pool = await getConnectionSQL();
  try {
    const lenguajeEncontrado = await pool
      .request()
      .input("id", sql.Int, id)
      .query(getProductByIdSQL);
    console.log(`REPOSITORY - getProductByIdRepository id:${id}`);

    return lenguajeEncontrado.recordset;
  } catch (error) {
    console.log("Error en REPOSITORY - getProductByIdRepository - " + error);
    throw Error("Error en REPOSITORY - getProductByIdRepository - " + error);
  } finally {
    pool.close();
  }
};
