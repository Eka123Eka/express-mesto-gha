const express = require('express');
const mongoose = require('mongoose');
const helmet = require('helmet');
const routes = require('./routes');

const { PORT = 3000, SERVER_ADR = 'http://127.0.0.1', DB_URL = 'mongodb://127.0.0.1:27017/mestodb' } = process.env;

mongoose.connect(DB_URL, {
  useNewUrlParser: true,
}).then(() => console.log(new Date(), 'connected to db:', mongoose.connections[0].name));

const app = express();

app.use(helmet());
app.use(express.json());
app.use((req, res, next) => {
  req.user = {
    _id: '64bff758ca97b24e917823c9',
  };
  next();
});
app.use(routes);
app.listen(PORT, () => {
  console.log(new Date(), `server is running at ${SERVER_ADR}:${PORT}`);
});
