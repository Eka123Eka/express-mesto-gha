const router = require('express').Router();
const userRoute = require('./users');
const cardRoute = require('./cards');

const ERROR_CODE = {
  not_found: 404,
};

router.use('/users', userRoute);
router.use('/cards', cardRoute);
router.use('*', (_req, res) => {
  res.status(ERROR_CODE.not_found).json({
    message: 'Запрашиваемая страница не найдена',
  });
});

module.exports = router;
