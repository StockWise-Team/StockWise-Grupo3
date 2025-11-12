const { Router } = require('express');
const {
  createNewUser,
  updateUser,
  deleteUser,
  getUserById,
  getAllUsers,
  changePassword
} = require('../controllers/usersController.js');

const router = Router();

router.post('/createNewUser', createNewUser);
router.put('/updateUser/:id', updateUser);
router.post('/deleteUser', deleteUser);
router.get('/getUserById/:id', getUserById);
router.post('/changePassword/:id', changePassword);
router.get('/getAllUsers', getAllUsers);

module.exports = router;