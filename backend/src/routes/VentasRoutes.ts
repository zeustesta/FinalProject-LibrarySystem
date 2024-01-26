import { Router } from "express";
import { deleteVenta, getVenta, getVentas, postLibroPorVenta, postVenta, updateStatusVenta } from "../controllers/VentasController";

const router = Router();

//ROUTES VENTAS 

router.get('/getVentas', getVentas);
router.get('/getVenta/:idVenta', getVenta);
router.delete('/deleteVenta/:idVenta', deleteVenta);
router.post('/postVenta', postVenta);
router.put('/updateVenta/:idVenta', updateStatusVenta);

//ROUTES PARA LIBROS X VENTA

router.post('/postLibroVendido', postLibroPorVenta);

export default router;