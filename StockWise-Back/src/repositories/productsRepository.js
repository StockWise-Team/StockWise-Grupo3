const { getConnectionSQL } = require("../database/connection");
const { getAllProductSQL } = require("../database/queries");

exports.getAllProductsRepository = async () => {
  const pool = await getConnectionSQL();

  //console.log("pool", pool);
  try {
    const result = await pool.request().query(getAllProductSQL);

    return result.recordset; // Devolver directamente el array sin stringify

  } catch (error) {
    console.log("Error en REPOSITORY - getAllProductsRepository - " + error);
    throw Error("Error en REPOSITORY - getAllProductsRepository - " + error);
  }
};
