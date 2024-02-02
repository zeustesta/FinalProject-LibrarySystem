import { Router } from "express";
import { deleteCarrito, deleteCliente, deleteLibroCarrito, deleteLibroFavoritos, getCarrito, getCliente, getClientes, getFavoritos, getHistorialComprasCliente, postCliente, postLibroEnCarrito, postLibroEnFavoritos, updateCliente, updateClienteRol, validarCliente, validarEmail } from "../controllers/ClientesController";


const router = Router();

//ROUTES PARA CLIENTE

router.get('/getClientes', getClientes);
router.get('/getCliente/:idCliente', getCliente);
router.post('/postCliente', postCliente);
router.put('/updateCliente/:idCliente', updateCliente);
router.put('/updateClienteRol/:idCliente', updateClienteRol);
router.delete('/deleteCliente/:idCliente', deleteCliente);

router.post('/validarCliente', validarCliente);
router.post('/validarEmail', validarEmail);

//ROUTES PARA FAVORITOS

router.get('/getFavs/:idCliente', getFavoritos);
router.delete('/deleteLibroFavs/:idCliente/:idLibro', deleteLibroFavoritos);
router.post('/postLibroEnFavs', postLibroEnFavoritos);

//ROUTES PARA CARRITO

router.get('/getCart/:idCliente', getCarrito);
router.delete('/deleteLibroCart/:idCliente/:idLibro', deleteLibroCarrito);
router.post('/postLibroEnCart', postLibroEnCarrito);

router.delete('/deleteCarrito/:idCliente', deleteCarrito);

//GET HISTORIAL CLIENTE
router.get('/getHistorial/:idCliente', getHistorialComprasCliente);

export default router;