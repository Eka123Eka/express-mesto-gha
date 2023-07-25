const router = require('express').Router();

const {
  getCards,
  createCard,
  deleteCard,
  setLike,
  unsetLike,
} = require('../controllers/cards');

router.get('/', getCards);
router.delete('/:cardId', deleteCard);
router.post('/', createCard);
router.put('/:cardId/likes', setLike);
router.delete('/:cardId/likes', unsetLike);

module.exports = router;
