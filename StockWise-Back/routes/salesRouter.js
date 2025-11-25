const express = require('express')
const { createSale, getAllSales, getTodaySales } = require('../controllers/salesController')
const salesRouter = express()

salesRouter.post('/', createSale)
salesRouter.get('/', getAllSales)
salesRouter.get('/today', getTodaySales)

module.exports = salesRouter
