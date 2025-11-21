const bcrypt = require('bcryptjs');
const userRepository = require('../repositories/userRepository');

const createUser = async ({ nombre_completo, mail, contraseña, rol }) => {
 try {
  if (!nombre_completo || !mail || !contraseña || !rol) {
    const error = new Error('Faltan campos obligatorios');
    error.status = 400;
    throw error;
  }

  const salt = await bcrypt.genSalt(10);
  const hashed = await bcrypt.hash(contraseña, salt);

 
    return await userRepository.insertUser({
      nombre_completo,
      mail,
      hashedPassword: hashed,
      rol
    });
  } catch (error) {
    if (error.number === 2627) {
      const err = new Error('El mail ya está en uso');
      err.status = 400;
      throw err;
    }
    throw error;
  }
};

const updateUser = async (id, { nombre_completo, mail, rol }) => {
 try { 
  if (!nombre_completo || !mail || !rol) {
    const error = new Error('Faltan campos obligatorios');
    error.status = 400;
    throw error;
  }


    const result = await userRepository.updateUser(id, { nombre_completo, mail, rol });

    if (result.rowsAffected[0] === 0) {
      const err = new Error('Usuario no encontrado');
      err.status = 404;
      throw err;
    }
    return result;
  } catch (error) {
    if (error.number === 2627) {
      const err = new Error('El mail ya está en uso por otro usuario');
      err.status = 400;
      throw err;
    }
    throw error;
  }
};

const deleteUser = async (id) => {
  try {
  if (!id) {
    const error = new Error('ID requerido');
    error.status = 400;
    throw error;
  }


    const result = await userRepository.deleteUser(id);

    if (result.rowsAffected[0] === 0) {
      const err = new Error('Usuario no encontrado');
      err.status = 404;
      throw err;
    }
    return result;
  } catch (error) {
    if (error.number === 547) {
      const err = new Error('No se puede eliminar, tiene ventas o cierres asociados');
      err.status = 400;
      throw err;
    }
    throw error;
  }
};

const getUserById = async (id) => {
  const result = await userRepository.getUserById(id);

  if (result.recordset.length === 0) {
    const error = new Error('Usuario no encontrado');
    error.status = 404;
    throw error;
  }
  return result.recordset[0];
};

const changePassword = async (id, { oldPassword, newPassword }) => {
 try {
  if (!oldPassword || !newPassword) {
    const error = new Error('Contraseña antigua y nueva requeridas');
    error.status = 400;
    throw error;
  }

  const result = await userRepository.getPasswordHash(id);

  if (result.recordset.length === 0) {
    const error = new Error('Usuario no encontrado');
    error.status = 404;
    throw error;
  }

  const storedHash = result.recordset[0].CONTRASEÑA;
  const isMatch = await bcrypt.compare(oldPassword, storedHash);

  if (!isMatch) {
    const error = new Error('La contraseña antigua es incorrecta');
    error.status = 400;
    throw error;
  }

  const salt = await bcrypt.genSalt(10);
  const hashed = await bcrypt.hash(newPassword, salt);

  return await userRepository.updatePassword(id, hashed);
    } catch (error) {
    throw error;
  }
};

const getAllUsers = async () => {
  try {
    return await userRepository.getAllUsers();
  } catch (error) {
    throw error;
  }
};

module.exports = {
  createUser,
  updateUser,
  deleteUser,
  getUserById,
  changePassword,
  getAllUsers
};
