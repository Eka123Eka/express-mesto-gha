const Card = require('../models/card');

const getCards = (req, res) => {
  Card.find({})
    .then((cards) => res.status(200).send(cards))
    .catch((err) => res.status(500).send({
      message: `При запросе списка карточек на сервере возникла непредвиденная ошибка ${err.message}`,
    }));
};

const createCard = (req, res) => {
  const owner = req.user._id;
  const { name, link } = req.body;

  Card.create({ name, link, owner })
    .then((newCard) => {
      res.status(201).send(newCard);
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res.status(400).send({
          message: `При создании карточки переданы некорректные данные.
            ${Object.values(err.errors).map((e) => e.message).join(', ')}`,
        });
      } else {
        res.status(500).send({
          message: `При создании карточки на сервере возникла непредвиденная ошибка ${err.message}`,
        });
      }
    });
};

const deleteCard = (req, res) => {
  const { cardId } = req.params;

  Card.findById(cardId)
    .then((card) => {
      if (!card) {
        res.status(404).send({
          message: `Карточка с указанным id: ${cardId} не найдена`,
        });
      } else {
        Card.findByIdAndRemove(cardId)
          .then((deletedCard) => res.status(200).send(deletedCard));
      }
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        res.status(400).send({
          message: `Некорректный id карточки: ${cardId}`,
        });
      } else {
        res.status(500).send({
          message: `При удалении карточки на сервере возникла непредвиденная ошибка ${err.message}`,
        });
      }
    });
};

const setLike = (req, res) => {
  const owner = req.user._id;
  const { cardId } = req.params;

  Card.findById(cardId)
    .then((card) => {
      if (!card) {
        res.status(404).send({
          message: `Карточка с указанным id: ${cardId} не найдена`,
        });
      } else {
        Card.findByIdAndUpdate(
          cardId,
          { $addToSet: { likes: owner } },
          { new: true },
        ).then((deletedCard) => res.status(200).send(deletedCard));
      }
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        res.status(400).send({
          message: `Переданы некорректные данные для установки лайка: ${cardId}`,
        });
      } else {
        res.status(500).send({
          message: `При установке лайка на сервере возникла непредвиденная ошибка ${err.message}`,
        });
      }
    });
};

const unsetLike = (req, res) => {
  const owner = req.user._id;
  const { cardId } = req.params;

  Card.findById(cardId)
    .then((card) => {
      if (!card) {
        res.status(404).send({
          message: `Карточка с указанным id: ${cardId} не найдена`,
        });
      } else {
        Card.findByIdAndUpdate(
          cardId,
          { $pull: { likes: owner } },
          { new: true },
        )
          .then((deletedCard) => res.status(200).send(deletedCard));
      }
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        res.status(400).send({
          message: `Переданы некорректные данные для снятия лайка: ${cardId}`,
        });
      } else {
        res.status(500).send({
          message: `При установке лайка на сервере возникла непредвиденная ошибка ${err.message}`,
        });
      }
    });
};

module.exports = {
  getCards,
  createCard,
  deleteCard,
  setLike,
  unsetLike,
};
