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
router.post('/validarCliente', ClientesController_1.validarCliente);
router.post('/validarEmail', ClientesController_1.validarEmail);
//ROUTES PARA FAVORITOS
router.get('/getFavs/:idCliente', ClientesController_1.getFavoritos);
router.delete('/deleteLibroFavs/:idCliente/:idLibro', ClientesController_1.deleteLibroFavoritos);
router.post('/postLibroEnFavs', ClientesController_1.postLibroEnFavoritos);
//ROUTES PARA CARRITO
router.get('/getCart/:idCliente', ClientesController_1.getCarrito);
router.delete('/deleteLibroCart/:idCliente/:idLibro', ClientesController_1.deleteLibroCarrito);
router.post('/postLibroEnCart', ClientesController_1.postLibroEnCarrito);
router.delete('/deleteCarrito/:idCliente', ClientesController_1.deleteCarrito);
//GET HISTORIAL CLIENTE
router.get('/getHistorial/:idCliente', ClientesController_1.getHistorialComprasCliente);
exports.default = router;
