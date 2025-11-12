const { getConnectionSQL } = require("../database/connection");
const { getAuthUser } = require("../database/queries");
const sql = require("mssql");
const bcrypt = require("bcryptjs");

exports.authUserRepository = async (email, contra) => {
  const pool = await getConnectionSQL();
  try {
    const result = await pool
      .request()
      .input("EMAIL", sql.VarChar, email)
      .query(getAuthUser);

    console.log(result);

    if (result.recordset.length === 0) {
      return null;
    }

    const user = result.recordset[0];
    const isMatch = contra === user.CONTRASEÑA  //await bcrypt.compare(contra, user.CONTRASEÑA); TODO: revisar implementacion de library bcryptjs
    console.log(isMatch, contra, user.CONTRASEÑA)

    if (!isMatch) {
      return null;
    }
    const { CONTRASEÑA, ...userData } = user;
    return userData;
  } catch (error) {
    throw new Error("Error en authRepository: " + error.message);
  } finally {
    pool.close();
  }
};
