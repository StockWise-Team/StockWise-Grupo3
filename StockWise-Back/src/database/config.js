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
  },
};

module.exports = configDB;
