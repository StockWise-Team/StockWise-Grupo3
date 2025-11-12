const { getConnectionSQL } = require('../database/connection.js');
const queries = require('../database/queries.js');
const sql = require('mssql');
const bcrypt = require('bcryptjs');

const createNewUser = async (req, res) => {
  try {
    const pool = await getConnectionSQL();
    const { nombre_completo, mail, contraseña, rol } = req.body;
    
    if (!nombre_completo || !mail || !contraseña || !rol) {
      return res.status(400).json({ message: 'Faltan campos obligatorios' });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(contraseña, salt);

    const request = pool.request();
    request.input('nombre_completo', sql.VarChar, nombre_completo);
    request.input('mail', sql.VarChar, mail);
    request.input('contraseña', sql.VarChar, hashedPassword);
    request.input('rol', sql.VarChar, rol);

    await request.query(queries.createNewUserSQL);
    res.status(201).json({ message: 'Usuario creado exitosamente' });

  } catch (error) {
    if (error.number === 2627) {
        return res.status(400).json({ message: 'El mail ya está en uso' });
    }
    res.status(500).json({ message: 'Error en el servidor', error: error.message });
  }
};

const updateUser = async (req, res) => {
  try {
    const pool = await getConnectionSQL();
    const { id } = req.params;
    const { nombre_completo, mail, rol } = req.body;

    if (!nombre_completo || !mail || !rol) {
      return res.status(400).json({ message: 'Faltan campos obligatorios' });
    }
    
    const request = pool.request();
    request.input('id', sql.Int, id);
    request.input('nombre_completo', sql.VarChar, nombre_completo);
    request.input('mail', sql.VarChar, mail);
    request.input('rol', sql.VarChar, rol);

    const result = await request.query(queries.updateUserSQL);
    
    if (result.rowsAffected[0] === 0) {
        return res.status(404).json({ message: 'Usuario no encontrado' });
    }
    res.status(200).json({ message: 'Usuario actualizado exitosamente' });

  } catch (error) {
    if (error.number === 2627) {
        return res.status(400).json({ message: 'El mail ya está en uso por otro usuario' });
    }
    res.status(500).json({ message: 'Error en el servidor', error: error.message });
  }
};

const deleteUser = async (req, res) => {
  try {
    const pool = await getConnectionSQL();
    const { id } = req.body;
    if (!id) {
      return res.status(400).json({ message: 'ID de usuario requerido' });
    }
    const result = await pool.request()
        .input('id', sql.Int, id)
        .query(queries.deleteUserSQL);

    if (result.rowsAffected[0] === 0) {
        return res.status(404).json({ message: 'Usuario no encontrado' });
    }
    res.status(200).json({ message: 'Usuario eliminado exitosamente' });

  } catch (error) {
    if (error.number === 547) {
        return res.status(400).json({ message: 'No se puede eliminar el usuario, tiene ventas o cierres de caja asociados.' });
    }
    res.status(500).json({ message: 'Error en el servidor', error: error.message });
  }
};


const getUserById = async (req, res) => {
  try {
    const pool = await getConnectionSQL();
    const { id } = req.params;

    const request = pool.request();
    request.input('id', sql.Int, id);

    const result = await request.query(queries.getUserByIdSQL);
    
    if (result.recordset.length === 0) {
        return res.status(404).json({ message: 'Usuario no encontrado' });
    }
    res.status(200).json(result.recordset[0]);

  } catch (error) {
    res.status(500).json({ message: 'Error en el servidor', error: error.message });
  }
};

const changePassword = async (req, res) => {
    try {
        const pool = await getConnectionSQL();
        const { id } = req.params;
        const { oldPassword, newPassword } = req.body;

        if (!oldPassword || !newPassword) {
            return res.status(400).json({ message: 'Contraseña antigua y nueva son requeridas' });
        }

        const request = pool.request();
        request.input('id', sql.Int, id);
        const result = await request.query(queries.getPasswordHashSQL);
        
        if (result.recordset.length === 0) {
            return res.status(404).json({ message: 'Usuario no encontrado' });
        }

        const storedHash = result.recordset[0].CONTRASEÑA;
        const isMatch = await bcrypt.compare(oldPassword, storedHash);
        if (!isMatch) {
            return res.status(400).json({ message: 'La contraseña antigua es incorrecta' });
	}

        const salt = await bcrypt.genSalt(10);
        const newHashedPassword = await bcrypt.hash(newPassword, salt);

        const updateRequest = pool.request();
        updateRequest.input('id', sql.Int, id);
        updateRequest.input('newPass', sql.VarChar, newHashedPassword);
        
        await updateRequest.query(queries.changePasswordSQL);

        res.status(200).json({ message: 'Contraseña actualizada exitosamente' });

    } catch (error) {
        res.status(500).json({ message: 'Error en el servidor', error: error.message });
    }
};
const getAllUsers = async (req, res) => {
  try {
    const pool = await getConnectionSQL();
    const request = pool.request();
    
    const result = await request.query(queries.getAllUsersSQL);
    
    res.status(200).json(result.recordset);

  } catch (error) {
    res.status(500).json({ message: 'Error en el servidor', error: error.message });
  }
};

module.exports = {
  createNewUser,
  updateUser,
  deleteUser,
  getUserById,
  changePassword,
  getAllUsers
};