import { Router } from "express";
import { getLibros, getLibro, deleteLibro, postLibro, updateLibro } from "../controllers/libros";

const router = Router();

router.get('/', getLibros);
router.get('/:id', getLibro);
router.delete('/:id', deleteLibro);
router.post('/', postLibro);
router.put('/:id', updateLibro)

export default router;