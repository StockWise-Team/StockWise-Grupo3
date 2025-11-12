const express = require('express')
const { openCash, getCashStatus, closeCash, getCashHistory } = require('../controllers/cashController')
const cashRouter = express()

// Rutas para gestión de caja
cashRouter.post('/open', openCash)        // Abrir nueva caja
cashRouter.get('/status', getCashStatus)   // Obtener estado actual
cashRouter.post('/close', closeCash)       // Cerrar caja
cashRouter.get('/history', getCashHistory) // Historial de cierres

module.exports = cashRouter