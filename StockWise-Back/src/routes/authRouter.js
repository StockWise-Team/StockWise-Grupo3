const express = require("express");
const {
    authUsers
} = require("../controllers/authController");
const authRouter = express();

authRouter.get("/", authUsers);

module.exports = authRouter;