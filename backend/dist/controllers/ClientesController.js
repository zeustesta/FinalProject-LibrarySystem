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
exports.postCompra = exports.getCompras = exports.deleteLibroCarrito = exports.getCarrito = exports.deleteLibroFavoritos = exports.getFavoritos = exports.updateCliente = exports.postCliente = exports.deleteCliente = exports.getCliente = exports.getClientes = void 0;
const ClientesModel_1 = require("../models/ClientesModel");
//METODOS PARA CLIENTE
const getClientes = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const listaClientes = yield ClientesModel_1.Cliente.findAll();
    res.json(listaClientes);
});
exports.getClientes = getClientes;
const getCliente = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { idCliente } = req.params;
    const cliente = yield ClientesModel_1.Cliente.findByPk(idCliente);
    if (cliente) {
        res.json(cliente);
    }
    else {
        res.status(404).json({
            msg: `No existe un cliente con id: ${idCliente}`
        });
    }
});
exports.getCliente = getCliente;
const deleteCliente = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { idCliente } = req.params;
    const cliente = yield ClientesModel_1.Cliente.findByPk(idCliente);
    if (!cliente) {
        res.status(404).json({
            msg: `No existe un cliente con id: ${idCliente}`
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
    const { idCliente } = req.params;
    try {
        const cliente = yield ClientesModel_1.Cliente.findByPk(idCliente);
        if (!cliente) {
            res.status(404).json({
                msg: `No existe un cliente con id: ${idCliente}`
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
//METODOS PARA FAVORITOS
const getFavoritos = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { idCliente } = req.params;
    const favoritos = yield ClientesModel_1.ClienteFavoritos.findAll({
        where: {
            idCliente: idCliente,
        },
    });
    if (favoritos.length > 0) {
        res.json(favoritos);
    }
    else {
        res.status(404).json({
            msg: `No existen favoritos para el cliente con id: ${idCliente}`
        });
    }
});
exports.getFavoritos = getFavoritos;
const deleteLibroFavoritos = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { idCliente } = req.params;
    const { idLibro } = req.params;
    const libroEnFavoritos = yield ClientesModel_1.ClienteFavoritos.findOne({
        where: {
            idCliente: idCliente,
            idLibro: idLibro,
        },
    });
    if (libroEnFavoritos) {
        yield ClientesModel_1.ClienteFavoritos.destroy({
            where: {
                idCliente: idCliente,
                idLibro: idLibro,
            },
        });
        res.json({
            msg: `Libro eliminado de favoritos del cliente con id: ${idCliente}`,
        });
    }
    else {
        res.status(404).json({
            msg: `El libro no existe en favoritos del cliente con id: ${idCliente}`,
        });
    }
});
exports.deleteLibroFavoritos = deleteLibroFavoritos;
//METODOS PARA CARRITO
const getCarrito = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { idCliente } = req.params;
    const carrito = yield ClientesModel_1.ClienteCarrito.findAll({
        where: {
            idCliente: idCliente,
        },
    });
    if (carrito.length > 0) {
        res.json(carrito);
    }
    else {
        res.status(404).json({
            msg: `No existe un carrito para el cliente con id: ${idCliente}`
        });
    }
});
exports.getCarrito = getCarrito;
const deleteLibroCarrito = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { idCliente } = req.params;
    const { idLibro } = req.params;
    const libroEnCarrito = yield ClientesModel_1.ClienteCarrito.findOne({
        where: {
            idCliente: idCliente,
            idLibro: idLibro,
        },
    });
    if (libroEnCarrito) {
        yield ClientesModel_1.ClienteCarrito.destroy({
            where: {
                idCliente: idCliente,
                idLibro: idLibro,
            },
        });
        res.json({
            msg: `Libro eliminado del carrito del cliente con id: ${idCliente}`,
        });
    }
    else {
        res.status(404).json({
            msg: `El libro no existe en el carrito del cliente con id: ${idCliente}`,
        });
    }
});
exports.deleteLibroCarrito = deleteLibroCarrito;
//METODOS PARA COMPRAS
const getCompras = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { idCliente } = req.params;
    const compras = yield ClientesModel_1.ClienteCompras.findAll({
        where: {
            idCliente: idCliente,
        },
    });
    if (compras.length > 0) {
        res.json(compras);
    }
    else {
        res.status(404).json({
            msg: `No existen compras para el cliente con id: ${idCliente}`
        });
    }
});
exports.getCompras = getCompras;
const postCompra = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { body } = req;
    try {
        yield ClientesModel_1.ClienteCompras.create(body);
        res.json({
            msg: 'Compra registrada con exito'
        });
    }
    catch (error) {
        console.log(error);
        console.log('No se ha podido agregar la compra');
    }
});
exports.postCompra = postCompra;
// export const deleteCompra = async (req: Request, res: Response) => {
//   const { idCliente } = req.params;
//   const { idCompra } = req.params;
//   const compra = await ClienteCompras.findOne({
//     where: {
//       idCliente: idCliente,
//       idLibro: idLibro,
//     },
//   });
//   if (libroEnCarrito) {
//     await ClienteCarrito.destroy({
//       where: {
//           idCliente: idCliente,
//           idLibro: idLibro,
//       },
//     });
//     res.json({
//       msg: `Libro eliminado del carrito del cliente con id: ${idCliente}`,
//     });
//   } else {
//     res.status(404).json({
//       msg: `El libro no existe en el carrito del cliente con id: ${idCliente}`,
//     });
//   }
// } 
