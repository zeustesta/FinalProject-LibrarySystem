import { Router } from "express";
import { deleteCliente, getCliente, getClientes, postCliente, updateCliente } from "../controllers/ClientesController";


const router = Router();

router.get('/getClientes', getClientes);
router.get('/getCliente/:id', getCliente);
router.delete('/deleteCliente/:id', deleteCliente);
router.post('/postCliente', postCliente);
router.put('/updateCliente/:id', updateCliente);

export default router;