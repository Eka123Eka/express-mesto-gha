const {
  PORT = 3000,
  SERVER_ADR = 'http://127.0.0.1',
  DB_URL = 'mongodb://localhost:27017/mestodb',
  JWT_SECRET_KEY = 'secret-key',
} = process.env;
const timeInMs = 10 * 60 * 1000;
const limitQuery = 100;
const salt = 10;

module.exports = {
  PORT,
  SERVER_ADR,
  DB_URL,
  timeInMs,
  limitQuery,
  JWT_SECRET_KEY,
  salt,
};
