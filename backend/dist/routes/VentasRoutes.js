"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const VentasController_1 = require("../controllers/VentasController");
const router = (0, express_1.Router)();
router.get('/getVentas', VentasController_1.getVentas);
router.get('/getVenta/:id', VentasController_1.getVenta);
router.delete('/deleteVenta/:id', VentasController_1.deleteVenta);
router.post('/postVenta', VentasController_1.postVenta);
router.put('/updateVenta/:id', VentasController_1.updateVenta);
exports.default = router;
