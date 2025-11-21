const userService = require('../services/userService');

const createNewUser = async (req, res) => {
  try {
    const result = await userService.createUser(req.body);
    res.status(201).json({ message: 'Usuario creado exitosamente', result });
  } catch (error) {
    res.status(error.status || 500).json({ message: error.message });
  }
};

const updateUser = async (req, res) => {
  try {
    const result = await userService.updateUser(req.params.id, req.body);
    res.status(200).json({ message: 'Usuario actualizado exitosamente', result });
  } catch (error) {
    res.status(error.status || 500).json({ message: error.message });
  }
};

const deleteUser = async (req, res) => {
  try {
    const result = await userService.deleteUser(req.body.id);
    res.status(200).json({ message: 'Usuario eliminado exitosamente', result });
  } catch (error) {
    res.status(error.status || 500).json({ message: error.message });
  }
};

const getUserById = async (req, res) => {
  try {
    const result = await userService.getUserById(req.params.id);
    res.status(200).json(result);
  } catch (error) {
    res.status(error.status || 500).json({ message: error.message });
  }
};

const changePassword = async (req, res) => {
  try {
    const result = await userService.changePassword(req.params.id, req.body);
    res.status(200).json({ message: 'Contraseña actualizada exitosamente', result });
  } catch (error) {
    res.status(error.status || 500).json({ message: error.message });
  }
};

const getAllUsers = async (req, res) => {
  try {
    const result = await userService.getAllUsers();
    res.status(200).json(result);
  } catch (error) {
    res.status(error.status || 500).json({ message: error.message });
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