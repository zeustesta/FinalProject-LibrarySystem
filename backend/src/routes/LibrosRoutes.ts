import { Router } from "express";
import { getLibros, getLibro, deleteLibro, postLibro, updateLibro } from "../controllers/LibrosController";

const router = Router();

router.get('/getLibros', getLibros);
router.get('/getLibro/:id', getLibro);
router.delete('/deleteLibro/:id', deleteLibro);
router.post('/postLibro', postLibro);
router.put('/updateLibro/:id', updateLibro);

export default router;