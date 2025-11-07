const express = require('express')
const productsRouter = require('./productRouter')
const salesRouter = require('./salesRouter')
const router = express()

//Convierte a JSON las respuestas que llegan al router
router.use(express.json())

router.use('/products', productsRouter)
router.use('/sales', salesRouter)

module.exports = router