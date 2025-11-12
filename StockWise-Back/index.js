const express = require("express");
const dotenv = require('dotenv');

dotenv.config();

const app = express();
const cors = require("cors");
const router = require('./src/routes/indexRouter');
const { getConnectionSQL } = require('./src/database/connection.js');

const PORT = 3000;
const HOST = "127.0.0.1";

app.use(cors());
app.use(express.json());
app.use("/api", router);
app.get("/", (req, res) => res.send("Corriendo server"));


const startServer = () => {
    app.listen(PORT, HOST, () => {
        console.log(`Server running at http://${HOST}:${PORT}/`);
    });
};

getConnectionSQL().then(pool => {
    if (pool) {
      console.log('Conectado a SQL Server');
      startServer();
    } else {
      console.error('no se pudo conectar a SQL Server');
    }
}).catch(err => {
    console.error('Error al conectar con SQL Server:', err);
});