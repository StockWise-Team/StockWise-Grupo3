const express = require("express");
const dotenv = require('dotenv');

dotenv.config();

const app = express();
const cors = require("cors");
const router = require('./routes/indexRouter');

const PORT = 3000;
const HOST = "127.0.0.1";

app.use(cors());
app.use("/api", router);
app.get("/", (req, res) => res.send("Corriendo server"));


app.listen(PORT, HOST, () => {
    console.log(`Server running at http://${HOST}:${PORT}/`);
});