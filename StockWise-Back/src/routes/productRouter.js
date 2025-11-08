const express = require('express')
const { readProducts, readProductById, deleteProduct } = require('../controllers/productsController')
const productsRouter = express()

productsRouter.get('/', readProducts)
productsRouter.get('/:id', readProductById)
productsRouter.delete('/:id', deleteProduct)

module.exports = productsRouter