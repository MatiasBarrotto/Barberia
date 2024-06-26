const express = require('express');
const router = express.Router();
const controladores = require('../controllers/mainController');

router.get('/api/turnos', controladores.getTurnos);
router.post('/api/turnos', controladores.crearRegistro);
router.put('/api/turnos', controladores.actualizar);
router.delete('/api/turnos', controladores.eliminar);

module.exports = router;
