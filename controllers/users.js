const User = require('../models/user');

const getUsers = (req, res) => {
  User.find({})
    .then((allUsers) => res.status(200).send(allUsers))
    .catch((err) => res.status(500).send({
      message: `При запросе списка пользователей на сервере возникла непредвиденная ошибка ${err.message}`,
    }));
};

const getUserById = (req, res) => {
  const { userId } = req.params;

  User.findById(userId)
    .then((user) => {
      if (!user) {
        res.status(404).send({
          message: `Пользователь по указанному id: ${userId} не найден`,
        });
      } else {
        res.status(200).send(user);
      }
    })
    .catch((err) => {
      if (err.name === "CastError") {
        res.status(400).send({
          message: `Некорректный id: ${userId} для поиска пользователя. Операция не выполнена.`,
        });
      } else {
        res.status(500).send({
          message: `При запросе пользователя по id на сервере возникла непредвиденная ошибка ${err.message}`,
        });
      }
    });
};

const createUser = (req, res) => {
  const newUserData = req.body;
  User.create(newUserData)
    .then((newUser) => {
      res.status(201).send(newUser);
    })
    .catch((err) => {
      if (err.name === "ValidationError") {
        res.status(400).send({
          message: `При создании пользователя переданы некорректные данные.
            ${Object.values(err.errors).map((err) => err.message).join(", ")}`,
        });
      } else {
        res.status(500).send({
          message: `При создании пользователя на сервере возникла непредвиденная ошибка ${err.message}`,
        });
      }
    });
};

const updateUser = (req, res) => {
  const userId = req.user._id;
  const { name, about } = req.body;

  User.findByIdAndUpdate(userId, { name, about }, { new: true, runValidators: true })
    .then((user) => {
      if (!user) {
        res.status(404).send({
          message: `Пользователь по указанному id: ${userId} не найден`,
        });
      } else {
        res.status(200).send(user);
      }
    })
    .catch((err) => {
      if (err.name === "ValidationError") {
        res.status(400).send({
          message: `При обновлении пользователя переданы некорректные данные.
            ${Object.values(err.errors).map((err) => err.message).join(", ")}`,
        });
      } else {
        res.status(500).send({
          message: `При обновлении пользователя на сервере возникла непредвиденная ошибка ${err.message}`,
        });
      }
    });
};

const updateAvatar = (req, res) => {
  const userId = req.user._id;
  const { avatar } = req.body;

  User.findByIdAndUpdate(userId, { avatar }, { new: true, runValidators: true })
    .then((user) => {
      if (!user) {
        res.status(404).send({
          message: `Пользователь по указанному id: ${userId} не найден`,
        });
      } else {
        res.status(200).send(user);
      }
    })
    .catch((err) => {
      if (err.name === "ValidationError") {
        res.status(400).send({
          message: `При обновлении аватара пользователя переданы некорректные данные.
            ${Object.values(err.errors).map((err) => err.message).join(", ")}`,
        });
      } else {
        res.status(500).send({
          message: `При обновлении пользователя на сервере возникла непредвиденная ошибка ${err.message}`,
        });
      }
    });
};

module.exports = {
  getUsers,
  getUserById,
  createUser,
  updateUser,
  updateAvatar,
};
