const express = require("express");
const app = express();

const PORT = 3000;
const HOST = "127.0.0.1";

app.get("/", (req, res) => res.send("Corriendo server"));

app.listen(PORT, HOST, () => {
  console.log(`Server running at http://${HOST}:${PORT}/`);
});
