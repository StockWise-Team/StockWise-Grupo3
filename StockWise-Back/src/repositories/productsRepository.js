const { getConnectionSQL } = require("../database/connection");
const { getAllProductSQL } = require("../database/queries");

exports.getAllProductsRepository = async () => {
  const pool = await getConnectionSQL();
  try {
    const result = await pool.request().query(getAllProductSQL);

    return JSON.stringify(result.recordset);
  } catch (error) {
    console.log("Error en REPOSITORY - getAllProductsRepository - " + error);
    throw Error("Error en REPOSITORY - getAllProductsRepository - " + error);
  }
};
