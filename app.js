const express = require('express');
const mongoose = require('mongoose');
const routes = require('./routes');

const { PORT = 3000, SERVER_ADR = 'http://127.0.0.1' } = process.env;

mongoose.connect('mongodb://127.0.0.1:27017/mestodb', {
  useNewUrlParser: true,
}).then(() => console.log(new Date(), 'connected to db:', mongoose.connections[0].name));

const app = express();

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

