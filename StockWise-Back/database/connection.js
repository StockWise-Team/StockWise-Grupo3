const sql = require("mssql");
const configDB = require("../database/config");

exports.getConnectionSQL = async () => {
  try {
    const pool = await sql.connect(configDB);

    return pool;
  } catch (error) {
    console.log(`Error en getConnection: ${error}`);
  }
};
