import { Router } from "express";
import { deleteVenta, getVenta, getVentas, postLibroPorVenta, postVenta, updateVenta } from "../controllers/VentasController";

const router = Router();

router.get('/getVentas', getVentas);
router.get('/getVenta/:id', getVenta);
router.delete('/deleteVenta/:id', deleteVenta);
router.post('/postVenta', postVenta);
router.post('/postLibroVendido', postLibroPorVenta);
router.put('/updateVenta/:id', updateVenta);

export default router;