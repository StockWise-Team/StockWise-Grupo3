const express = require('express')
const { readProducts } = require('../controllers/productsController')
const productsRouter = express()

productsRouter.get('/', readProducts)

module.exports = productsRouter