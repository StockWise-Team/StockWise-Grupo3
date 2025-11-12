const express = require('express')
const productsRouter = require('./productRouter')
const authRouter = require('./authRouter')
const salesRouter = require('./salesRouter')
const stockRouter = require('./stockRouter')
const cashRouter = require('./cashRouter')
const usersRouter = require('./usersRouter.js');

const router = express()

//Convierte a JSON las respuestas que llegan al router
router.use(express.json())

router.use('/products', productsRouter)
router.use('/auth', authRouter)
router.use('/sales', salesRouter)
router.use('/stock', stockRouter)
router.use('/cash', cashRouter)
router.use('/users', usersRouter);

module.exports = router