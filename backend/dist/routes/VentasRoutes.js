"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const VentasController_1 = require("../controllers/VentasController");
const router = (0, express_1.Router)();
//ROUTES VENTAS 
router.get('/getVentas', VentasController_1.getVentas);
router.get('/getVenta/:idVenta', VentasController_1.getVenta);
router.delete('/deleteVenta/:idVenta', VentasController_1.deleteVenta);
router.post('/postVenta', VentasController_1.postVenta);
router.put('/updateVenta/:idVenta', VentasController_1.updateStatusVenta);
//ROUTES PARA LIBROS X VENTA
router.post('/postLibroVendido', VentasController_1.postLibroPorVenta);
router.get('/getLibrosPorVenta/:idVenta', VentasController_1.getLibrosPorVenta);
exports.default = router;
