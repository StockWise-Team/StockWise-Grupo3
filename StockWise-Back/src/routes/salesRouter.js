const express = require('express')
const { createSale } = require('../controllers/salesController')
const salesRouter = express()

salesRouter.post('/', createSale)

module.exports = salesRouter
