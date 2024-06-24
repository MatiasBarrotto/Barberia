const express = require('express')
const router = express.Router()
const controladores = require(`../controllers/mainController`)
//const path = require('path')



router.get("/turnos", controladores.getListado)
router.post('/turnos', controladores.crearRegistro)
router.get('/modificar/:id', controladores.getModificar)
router.put('/modificar', controladores.actualizar)
router.delete('/turnos', controladores.eliminar)

module.exports = router