const express = require('express')
const { readProducts, readProductById, deleteProduct, createProduct } = require('../controllers/productsController')
const productsRouter = express()

productsRouter.get('/', readProducts)
productsRouter.get('/:id', readProductById)
productsRouter.delete('/:id', deleteProduct)
productsRouter.post('/', createProduct)

module.exports = productsRouter