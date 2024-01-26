"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const ClientesController_1 = require("../controllers/ClientesController");
const router = (0, express_1.Router)();
//ROUTES PARA CLIENTE
router.get('/getClientes', ClientesController_1.getClientes);
router.get('/getCliente/:idCliente', ClientesController_1.getCliente);
router.post('/postCliente', ClientesController_1.postCliente);
router.put('/updateCliente/:idCliente', ClientesController_1.updateCliente);
router.delete('/deleteCliente/:idCliente', ClientesController_1.deleteCliente);
//ROUTES PARA FAVORITOS
router.get('/getFavoritos/:idCliente', ClientesController_1.getFavoritos);
router.delete('/deleteLibroFavoritos/:idCliente/:idLibro', ClientesController_1.deleteLibroFavoritos);
//ROUTES PARA CARRITO
router.get('/getCarrito/:idCliente', ClientesController_1.getCarrito);
router.delete('/deleteLibroCarrito/:idCliente/:idLibro', ClientesController_1.deleteLibroCarrito);
//ROUTES PARA COMPRAS
exports.default = router;
