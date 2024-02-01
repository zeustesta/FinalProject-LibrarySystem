import { Router } from "express";
import { getLibros, getLibro, deleteLibro, postLibro, updateCantVentasLibro, updateStockLibro } from "../controllers/LibrosController";

const router = Router();

router.get('/getLibros', getLibros);
router.get('/getLibro/:idLibro', getLibro);
router.delete('/deleteLibro/:idLibro', deleteLibro);
router.post('/postLibro', postLibro);
router.put('/updateCantVentas/:idLibro', updateCantVentasLibro);
router.put('/updateStockLibro/:idLibro', updateStockLibro);

export default router;