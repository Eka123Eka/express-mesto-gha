const express = require('express');
const rateLimit = require('express-rate-limit');
const mongoose = require('mongoose');
const helmet = require('helmet');
const { errors } = require('celebrate');
const handleError = require('./middlewares/handle-errors');
const {
  // PORT, SERVER_ADR, DB_URL, timeInMs, limitQuery, требование 13го теста
  PORT, SERVER_ADR, timeInMs, limitQuery,
} = require('./utils/constants');

const routes = require('./routes');

// mongoose.connect(DB_URL, { требование 13го теста
mongoose.connect('mongodb://127.0.0.1:27017/mestodb', {
  useNewUrlParser: true,
}).then(() => console.log(new Date(Date.now()).toString(), 'connected to db:', mongoose.connections[0].name));

const app = express();

app.use(helmet());

const limiter = rateLimit({
  windowMs: timeInMs,
  max: limitQuery,
  standardHeaders: true,
  legacyHeaders: false,
  handler: (req, res, next, options) => res.status(options.statusCode).send(options.message),
});

app.use(limiter);
app.use(express.json());
app.use(routes);
app.use(errors());
app.use(handleError);

app.listen(PORT, () => {
  console.log(new Date(Date.now()).toString(), `server is running at ${SERVER_ADR}:${PORT}`);
});
