const express = require("express");
const {
    authUsers
} = require("../controllers/authController");
const authRouter = express.Router();

authRouter.post("/login", authUsers);

module.exports = authRouter;