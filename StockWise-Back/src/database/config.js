const dotenv = require("dotenv");

dotenv.config();

const configDB = {
  user: process.env.USER_DB_LOCAL,
  password: process.env.PASSWORD_DB_LOCAL,
  server: process.env.SERVER_NAME_LOCAL,
  database: process.env.NAME_DB_LOCAL,
  port: parseInt(process.env.PORT_DB_LOCAL),
  options: {
    trustServerCertificate: true,
    encrypt: false, // Para desarrollo local
    enableArithAbort: true,
  },
  connectionTimeout: 30000,
  requestTimeout: 30000,
};

module.exports = configDB;
