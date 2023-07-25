const router = require('express').Router();
const userRoute = require('./users');
const cardRoute = require('./cards');

router.use('/users', userRoute);
router.use('/cards', cardRoute);
router.use('*', (_req, res) => {
  res.status(404).json({
    message: 'Запрашиваемая страница не найдена',
  });
});

module.exports = router;
