"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateCliente = exports.postCliente = exports.deleteCliente = exports.getCliente = exports.getClientes = void 0;
const ClientesModel_1 = require("../models/ClientesModel");
const getClientes = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const listaClientes = yield ClientesModel_1.Cliente.findAll();
    res.json(listaClientes);
});
exports.getClientes = getClientes;
const getCliente = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const cliente = yield ClientesModel_1.Cliente.findByPk(id);
    if (cliente) {
        res.json(cliente);
    }
    else {
        res.status(404).json({
            msg: `No existe un cliente con id: ${id}`
        });
    }
});
exports.getCliente = getCliente;
const deleteCliente = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const cliente = yield ClientesModel_1.Cliente.findByPk(id);
    if (!cliente) {
        res.status(404).json({
            msg: `No existe un cliente con id: ${id}`
        });
    }
    else {
        yield cliente.destroy();
        res.json({
            msg: 'Cliente eliminado con exito'
        });
    }
});
exports.deleteCliente = deleteCliente;
const postCliente = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { body } = req;
    try {
        yield ClientesModel_1.Cliente.create(body);
        res.json({
            msg: 'Cliente agregado con exito'
        });
    }
    catch (error) {
        console.log(error);
        console.log('No se ha podido agregar el cliente');
    }
});
exports.postCliente = postCliente;
const updateCliente = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { body } = req;
    const { id } = req.params;
    try {
        const cliente = yield ClientesModel_1.Cliente.findByPk(id);
        if (!cliente) {
            res.status(404).json({
                msg: `No existe un cliente con id: ${id}`
            });
        }
        else {
            yield cliente.update(body);
            res.json({
                msg: 'Cliente actualizado con exito'
            });
        }
    }
    catch (error) {
        console.log(error);
        console.log('No se ha podido actualizar el cliente');
    }
});
exports.updateCliente = updateCliente;
