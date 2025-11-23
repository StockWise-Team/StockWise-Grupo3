const { Router } = require('express');
const {
  createNewUser,
  updateUser,
  deleteUser,
  getUserById,
  getAllUsers,
  changePassword
} = require('../controllers/usersController.js');

const usersRouter = Router();

usersRouter.post('/createNewUser', createNewUser);
usersRouter.put('/updateUser/:id', updateUser);
usersRouter.delete('/deleteUser/:id', deleteUser);
usersRouter.get('/getUserById/:id', getUserById);
usersRouter.post('/changePassword/:id', changePassword);
usersRouter.get('/getAllUsers', getAllUsers);

module.exports = usersRouter;