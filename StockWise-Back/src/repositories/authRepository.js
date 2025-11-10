const { getConnectionSQL } = require("../database/connection");
const {
  getAuthUser
} = require("../database/queries");
const sql = require("mssql");

exports.authUserRepository = async (email, contra) => {
  const pool = await getConnectionSQL();
  try {
    const result = await pool
    .request()
    .input("EMAIL", sql.VarChar, email)
    .input("CONTRA", sql.VarChar, contra)
    .query("SELECT * FROM USUARIOS WHERE MAIL = @EMAIL AND CONTRASEÑA = @CONTRA");

    return result.recordset;
  } catch (error) {
    console.log("Error en REPOSITORY - getAllProductsRepository - " + error);
    throw Error("Error en REPOSITORY - getAllProductsRepository - " + error);
  } finally {
    pool.close();
  }
};
