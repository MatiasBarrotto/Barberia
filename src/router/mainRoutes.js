const express = require('express');
const router = express.Router();
const controladores = require('../controllers/mainController');

router.get('/api/productos', controladores.getProductos);
router.get('/api/productos/:id', controladores.getProductoPorId);
router.post('/api/productos', controladores.crearRegistro);
router.put('/api/productos', controladores.actualizar);
router.delete('/api/productos', controladores.eliminar);

module.exports = router;




