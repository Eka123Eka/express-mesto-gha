const Card = require('../models/card');

const {
  BadRequestError,
  ForbiddenError,
  NotFoundError,
} = require('../errors');

const getCards = (req, res, next) => {
  Card.find({})
    .then((cards) => res.send(cards))
    .catch(next);
};

const createCard = (req, res, next) => {
  const owner = req.user._id;
  const { name, link } = req.body;

  Card.create({ name, link, owner })
    .then((newCard) => {
      res.send(newCard);
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new BadRequestError('При создании карточки переданы некорректные данные.'));
      } else { next(err); }
    });
};

const deleteCard = (req, res, next) => {
  const { cardId } = req.params;

  Card.findById(cardId)
    .then((card) => {
      if (!card) {
        throw new NotFoundError(`Карточка с указанным id: ${cardId} не найдена`);
      } else if (card.owner.toString() !== req.user._id) {
        throw new ForbiddenError(`Карточка с указанным id: ${cardId} размещена не вашим пользователем. Удаление невозможно.`);
      } else {
        Card.findByIdAndRemove(cardId)
          .then((deletedCard) => res.send(deletedCard))
          .catch(next);
      }
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new BadRequestError(`Некорректный id карточки: ${cardId}`));
      } else { next(err); }
    });
};

const setLike = (req, res, next) => {
  const owner = req.user._id;
  const { cardId } = req.params;

  Card.findById(cardId)
    .then((card) => {
      if (!card) {
        throw new NotFoundError(`Карточка с указанным id: ${cardId} не найдена`);
      } else {
        Card.findByIdAndUpdate(
          cardId,
          { $addToSet: { likes: owner } },
          { new: true },
        ).then((deletedCard) => res.send(deletedCard))
          .catch(next);
      }
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new BadRequestError(`Переданы некорректные данные для установки лайка: ${cardId}`));
      } else { next(err); }
    });
};

const unsetLike = (req, res, next) => {
  const owner = req.user._id;
  const { cardId } = req.params;

  Card.findById(cardId)
    .then((card) => {
      if (!card) {
        throw new NotFoundError(`Карточка с указанным id: ${cardId} не найдена`);
      } else {
        Card.findByIdAndUpdate(
          cardId,
          { $pull: { likes: owner } },
          { new: true },
        )
          .then((deletedCard) => res.send(deletedCard))
          .catch(next);
      }
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new BadRequestError(`Переданы некорректные данные для снятия лайка: ${cardId}`));
      } else { next(err); }
    });
};

module.exports = {
  getCards,
  createCard,
  deleteCard,
  setLike,
  unsetLike,
};
