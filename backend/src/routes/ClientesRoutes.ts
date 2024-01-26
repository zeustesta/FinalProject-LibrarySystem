import { Router } from "express";
import { deleteCliente, deleteLibroCarrito, deleteLibroFavoritos, getCarrito, getCliente, getClientes, getFavoritos, postCliente, updateCliente } from "../controllers/ClientesController";


const router = Router();

//ROUTES PARA CLIENTE

router.get('/getClientes', getClientes);
router.get('/getCliente/:idCliente', getCliente);
router.post('/postCliente', postCliente);
router.put('/updateCliente/:idCliente', updateCliente);
router.delete('/deleteCliente/:idCliente', deleteCliente);

//ROUTES PARA FAVORITOS

router.get('/getFavoritos/:idCliente', getFavoritos);
router.delete('/deleteLibroFavoritos/:idCliente/:idLibro', deleteLibroFavoritos);

//ROUTES PARA CARRITO

router.get('/getCarrito/:idCliente', getCarrito);
router.delete('/deleteLibroCarrito/:idCliente/:idLibro', deleteLibroCarrito);

//ROUTES PARA COMPRAS



export default router;