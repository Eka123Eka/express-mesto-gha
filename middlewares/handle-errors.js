const handleError = (err, req, res, next) => {
  if (err.statusCode) {
    res.status(err.statusCode).send({
      message: err.message,
    });
  } else {
    res.status(500).send({
      message: `На сервере возникла непредвиденная ошибка. ${err.message}.
      ${Object.values(err.errors).map((e) => e.message).join(', ')}`,
    });
  }
  next();
};

module.exports = handleError;
