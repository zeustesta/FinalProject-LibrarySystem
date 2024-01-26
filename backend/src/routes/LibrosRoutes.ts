import { Router } from "express";
import { getLibros, getLibro, deleteLibro, postLibro, updateLibro } from "../controllers/LibrosController";

const router = Router();

router.get('/getLibros', getLibros);
router.get('/getLibro/:idLibro', getLibro);
router.delete('/deleteLibro/:idLibro', deleteLibro);
router.post('/postLibro', postLibro);
router.put('/updateLibro/:idLibro', updateLibro);

export default router;