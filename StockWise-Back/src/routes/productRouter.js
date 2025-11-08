const express = require('express')
const { readProducts, readProductById } = require('../controllers/productsController')
const productsRouter = express()

productsRouter.get('/', readProducts)
productsRouter.get('/:id', readProductById)

module.exports = productsRouter