const { getConnectionSQL } = require("../database/connection");
const queries = require("../database/queries");
const sql = require("mssql");

const insertUser = async ({ nombre_completo, mail, hashedPassword, rol }) => {
  const pool = await getConnectionSQL();
  try {
    console.log(
      `REPOSITORY - insertUser usuario:${nombre_completo}, ${mail}, ${hashedPassword}, ${rol}`
    );
    const newUser = await pool
      .request()
      .input("nombre_completo", sql.VarChar, nombre_completo)
      .input("mail", sql.VarChar, mail)
      .input("contraseña", sql.VarChar, hashedPassword)
      .input("rol", sql.VarChar, rol)
      .query(queries.createNewUserSQL);

    return newUser;
  } catch (error) {
    console.log("Error en Repositorio" + error);

    throw error;
  } finally {
    pool.close();
  }
};

const updateUser = async (id, { nombre_completo, mail, rol }) => {
  const pool = await getConnectionSQL();
  try {
    const newPass = await pool
      .request()
      .input("id", sql.Int, id)
      .input("nombre_completo", sql.VarChar, nombre_completo)
      .input("mail", sql.VarChar, mail)
      .input("rol", sql.VarChar, rol)
      .query(queries.updateUserSQL);

    return newPass;
  } catch (error) {
    throw error;
  } finally {
    pool.close();
  }
};

const deleteUser = async (id) => {
  const pool = await getConnectionSQL();
  try {
    return await pool
      .request()
      .input("id", sql.Int, id)
      .query(queries.deleteUserSQL);
  } catch (error) {
    throw error;
  } finally {
    pool.close();
  }
};

const getUserById = async (id) => {
  const pool = await getConnectionSQL();
  try {
    return await pool
      .request()
      .input("id", sql.Int, id)
      .query(queries.getUserByIdSQL);
  } catch (error) {
    throw error;
  } finally {
    pool.close();
  }
};

const getPasswordHash = async (id) => {
  const pool = await getConnectionSQL();
  try {
    return await pool
      .request()
      .input("id", sql.Int, id)
      .query(queries.getPasswordHashSQL);
  } catch (error) {
    throw error;
  } finally {
    pool.close();
  }
};

const updatePassword = async (id, hashedPassword) => {
  const pool = await getConnectionSQL();
  try {
    return await pool
      .request()
      .input("id", sql.Int, id)
      .input("newPass", sql.VarChar, hashedPassword)
      .query(queries.changePasswordSQL);
  } catch (error) {
    throw error;
  } finally {
    pool.close();
  }
};

const getAllUsers = async () => {
  const pool = await getConnectionSQL();
  try {
    const result = await pool.request().query(queries.getAllUsersSQL);
    return result.recordsets[0];
  } catch (error) {
    throw error;
  } finally {
    pool.close();
  }
};

module.exports = {
  insertUser,
  updateUser,
  deleteUser,
  getUserById,
  getPasswordHash,
  updatePassword,
  getAllUsers,
};
