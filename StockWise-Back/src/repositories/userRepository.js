const { getConnectionSQL } = require('../database/connection');
const queries = require('../database/queries');
const sql = require('mssql');

const insertUser = async ({ nombre_completo, mail, hashedPassword, rol }) => {
  const pool = await getConnectionSQL();
  return pool.request()
    .input('nombre_completo', sql.VarChar, nombre_completo)
    .input('mail', sql.VarChar, mail)
    .input('contraseña', sql.VarChar, hashedPassword)
    .input('rol', sql.VarChar, rol)
    .query(queries.createNewUserSQL);
};

const updateUser = async (id, { nombre_completo, mail, rol }) => {
  const pool = await getConnectionSQL();
  return pool.request()
    .input('id', sql.Int, id)
    .input('nombre_completo', sql.VarChar, nombre_completo)
    .input('mail', sql.VarChar, mail)
    .input('rol', sql.VarChar, rol)
    .query(queries.updateUserSQL);
};

const deleteUser = async (id) => {
  const pool = await getConnectionSQL();
  return pool.request()
    .input('id', sql.Int, id)
    .query(queries.deleteUserSQL);
};

const getUserById = async (id) => {
  const pool = await getConnectionSQL();
  return pool.request()
    .input('id', sql.Int, id)
    .query(queries.getUserByIdSQL);
};

const getPasswordHash = async (id) => {
  const pool = await getConnectionSQL();
  return pool.request()
    .input('id', sql.Int, id)
    .query(queries.getPasswordHashSQL);
};

const updatePassword = async (id, hashedPassword) => {
  const pool = await getConnectionSQL();
  return pool.request()
    .input('id', sql.Int, id)
    .input('newPass', sql.VarChar, hashedPassword)
    .query(queries.changePasswordSQL);
};

const getAllUsers = async () => {
  const pool = await getConnectionSQL();
  return pool.request().query(queries.getAllUsersSQL);
};

module.exports = {
  insertUser,
  updateUser,
  deleteUser,
  getUserById,
  getPasswordHash,
  updatePassword,
  getAllUsers
};
