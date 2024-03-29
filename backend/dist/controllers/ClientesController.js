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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getHistorialComprasCliente = exports.deleteCarrito = exports.postLibroEnCarrito = exports.deleteLibroCarrito = exports.getCarritoFunction = exports.getCarrito = exports.postLibroEnFavoritos = exports.deleteLibroFavoritos = exports.getFavoritos = exports.validarEmail = exports.validarCliente = exports.updateClienteRol = exports.updateCliente = exports.postCliente = exports.getCliente = exports.getClientes = void 0;
const ClientesModel_1 = require("../models/ClientesModel");
const VentasModel_1 = require("../models/VentasModel");
const LibrosModel_1 = __importDefault(require("../models/LibrosModel"));
const LibrosController_1 = require("./LibrosController");
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
const postCliente = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { body } = req;
    console.log(body);
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
const updateClienteRol = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { idCliente } = req.params;
    const { rol } = req.body;
    try {
        const cliente = yield ClientesModel_1.Cliente.findByPk(idCliente);
        if (!cliente) {
            res.status(404).json({
                msg: `No existe un usuario con id: ${idCliente}`
            });
        }
        else {
            cliente.set({ rol: rol });
            yield cliente.save();
            res.json({
                msg: 'Usuario actualizado con exito'
            });
        }
    }
    catch (error) {
        res.status(404).json({
            msg: 'No se pudo actualizar el rol',
            error
        });
    }
});
exports.updateClienteRol = updateClienteRol;
const validarCliente = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    try {
        const clienteEncontrado = yield ClientesModel_1.Cliente.findOne({
            where: {
                email: email,
                password: password
            }
        });
        if (clienteEncontrado !== undefined && clienteEncontrado !== null) {
            res.json(clienteEncontrado);
        }
        else {
            res.json(null);
        }
    }
    catch (error) {
        res.status(404).json({
            msg: `No se pudo validar el cliente`,
            error
        });
    }
});
exports.validarCliente = validarCliente;
const validarEmail = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email } = req.body;
    try {
        const emailEncontrado = yield ClientesModel_1.Cliente.findOne({
            where: {
                email: email
            }
        });
        if (emailEncontrado) {
            res.json({ msg: 'EXISTE' });
        }
        else {
            res.json({ msg: 'NO_EXISTE' });
        }
    }
    catch (error) {
        console.log(error);
        res.status(404).json({
            msg: `No se pudo validar el email`,
            error
        });
    }
});
exports.validarEmail = validarEmail;
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
        res.json([]);
    }
});
exports.getFavoritos = getFavoritos;
const deleteLibroFavoritos = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { idCliente } = req.params;
    const { idLibro } = req.params;
    try {
        const libroEnFavoritos = yield ClientesModel_1.ClienteFavoritos.findOne({
            where: {
                idCliente: idCliente,
                idLibro: idLibro
            }
        });
        if (libroEnFavoritos) {
            yield libroEnFavoritos.destroy();
            res.json({
                msg: `Libro eliminado de favoritos del cliente con id: ${idCliente}`
            });
        }
    }
    catch (error) {
        console.log(error);
        console.log('No se pudo eliminar el libro de favoritos');
    }
});
exports.deleteLibroFavoritos = deleteLibroFavoritos;
const postLibroEnFavoritos = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { body } = req;
    try {
        yield ClientesModel_1.ClienteFavoritos.create(body);
        res.json({
            msg: 'Libro agregado a favoritos con exito'
        });
    }
    catch (error) {
        console.log(error);
        console.log('No se ha podido agregar el libro a favoritos');
    }
});
exports.postLibroEnFavoritos = postLibroEnFavoritos;
//METODOS PARA CARRITO
const getCarrito = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { idCliente } = req.params;
    const carrito = yield getCarritoFunction(idCliente);
    if (carrito.length > 0) {
        res.json(carrito);
    }
    else {
        res.json([]);
    }
});
exports.getCarrito = getCarrito;
function getCarritoFunction(idCliente) {
    return __awaiter(this, void 0, void 0, function* () {
        const carrito = yield ClientesModel_1.ClienteCarrito.findAll({
            where: {
                idCliente: idCliente,
            },
            attributes: ['idLibro']
        });
        if (carrito.length > 0) {
            return carrito;
        }
        else {
            return [];
        }
    });
}
exports.getCarritoFunction = getCarritoFunction;
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
        yield libroEnCarrito.destroy();
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
const postLibroEnCarrito = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { body } = req;
    try {
        const libro = yield LibrosModel_1.default.findByPk(body.idLibro);
        if (libro && libro.getDataValue('stock') > 0) {
            const clienteCart = yield getCarritoFunction(body.idCliente);
            if ((clienteCart.find(item => item.getDataValue('idLibro') === body.idLibro)) === undefined) {
                const newStock = libro.getDataValue('stock') - 1;
                yield ClientesModel_1.ClienteCarrito.create(body);
                yield (0, LibrosController_1.updateStockLibroFunction)(body.idLibro, newStock);
                res.json({
                    agregado: 1 // AGREGADO CORRECTAMENTE 
                });
            }
            else {
                res.json({
                    agregado: 0 // YA EXISTE EN EL CARRITO
                });
            }
        }
        else {
            res.json({
                agregado: -1 // NO HAY STOCK
            });
        }
    }
    catch (error) {
        res.status(500).json({
            msg: 'No se ha podido agregar el libro al carrito',
            error
        });
    }
});
exports.postLibroEnCarrito = postLibroEnCarrito;
const deleteCarrito = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { idCliente } = req.params;
    try {
        yield ClientesModel_1.ClienteCarrito.destroy({
            where: {
                idCliente: idCliente
            }
        });
        res.json({
            msg: 'Libro agregado al carrito con exito'
        });
    }
    catch (error) {
        console.log(error);
        console.log('No se ha podido limpiar el carrito');
    }
});
exports.deleteCarrito = deleteCarrito;
//GET HISTORIAL CLIENTE
const getHistorialComprasCliente = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { idCliente } = req.params;
    try {
        const historialCompras = yield VentasModel_1.Venta.findAll({
            where: {
                idCliente: idCliente
            },
            attributes: ['estado', 'fechaCompra'],
            include: [{
                    model: VentasModel_1.LibrosVendidos,
                    attributes: ['idVenta'],
                    include: [{
                            model: LibrosModel_1.default,
                            as: 'LibrosVenta'
                        }],
                    as: 'LibrosVendidos'
                }]
        });
        if (historialCompras) {
            res.json(historialCompras);
        }
        else {
            res.json([]);
        }
    }
    catch (error) {
        console.log(error);
        res.status(404).json({
            msg: `No se pudo encontrar un historial`,
            error
        });
    }
});
exports.getHistorialComprasCliente = getHistorialComprasCliente;
