const router = require('express').Router();
const {
  validGetUserById, validUpdateUser, validUpdateAvatar,
} = require('../utils/validationFieldsWithJoi');

const {
  getUsers,
  getUserById,
  getLoginUser,
  updateUser,
  updateAvatar,
} = require('../controllers/users');

router.get('/', getUsers);
router.get('/:userId', validGetUserById, getUserById);
router.get('/me', getLoginUser);
router.patch('/me', validUpdateUser, updateUser);
router.patch('/me/avatar', validUpdateAvatar, updateAvatar);

module.exports = router;
