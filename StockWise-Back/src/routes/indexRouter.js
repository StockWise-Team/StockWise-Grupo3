const express = require('express')
const productsRouter = require('./productRouter')
const router = express()

//Convierte a JSON las respuestas que llegan al router
router.use(express.json())

router.use('/products', productsRouter)

module.exports = router