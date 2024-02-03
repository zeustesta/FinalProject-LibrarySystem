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
exports.getLibrosPorVenta = exports.postLibroPorVenta = exports.updateStatusVenta = exports.postVenta = exports.deleteVenta = exports.getVenta = exports.getVentas = void 0;
const VentasModel_1 = require("../models/VentasModel");
const LibrosModel_1 = __importDefault(require("../models/LibrosModel"));
//METODOS PARA VENTA
const getVentas = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const listaVentas = yield VentasModel_1.Venta.findAll();
    res.json(listaVentas);
});
exports.getVentas = getVentas;
const getVenta = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { idVenta } = req.params;
    const venta = yield VentasModel_1.Venta.findByPk(idVenta);
    if (venta) {
        res.json(venta);
    }
    else {
        res.status(404).json({
            msg: `No existe una venta con id: ${idVenta}`
        });
    }
});
exports.getVenta = getVenta;
const deleteVenta = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { idVenta } = req.params;
    const venta = yield VentasModel_1.Venta.findByPk(idVenta);
    if (!venta) {
        res.status(404).json({
            msg: `No existe una venta con id: ${idVenta}`
        });
    }
    else {
        yield venta.destroy();
        res.json({
            msg: 'Venta eliminada con exito'
        });
    }
});
exports.deleteVenta = deleteVenta;
const postVenta = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { body } = req;
    try {
        yield VentasModel_1.Venta.create(body);
        res.json({
            msg: 'Venta agregada con exito'
        });
    }
    catch (error) {
        console.log(error);
        res.status(404).json({
            msg: 'No se ha podido agregar la venta',
            error
        });
    }
});
exports.postVenta = postVenta;
const updateStatusVenta = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { idVenta } = req.params;
    const { estado } = req.body;
    try {
        const venta = yield VentasModel_1.Venta.findByPk(idVenta);
        if (!venta) {
            res.status(404).json({
                msg: `No existe una venta con id: ${idVenta}`
            });
        }
        else {
            venta.set({ estado: estado });
            yield venta.save();
            res.json({
                msg: 'Venta actualizada con exito'
            });
        }
    }
    catch (error) {
        console.log(error);
        res.status(404).json({
            msg: 'No se ha podido actualizar la venta',
            error
        });
    }
});
exports.updateStatusVenta = updateStatusVenta;
//METODOS PARA LIBROS X VENTA
const postLibroPorVenta = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { body } = req;
    try {
        yield VentasModel_1.LibrosVendidos.create(body);
        res.json({
            msg: 'Libro vendido agregado con exito'
        });
    }
    catch (error) {
        console.log(error);
        res.status(404).json({
            msg: 'No se ha podido agregar el libro vendido',
            error
        });
    }
});
exports.postLibroPorVenta = postLibroPorVenta;
const getLibrosPorVenta = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { idVenta } = req.params;
    const librosPorVenta = yield VentasModel_1.LibrosVendidos.findAll({
        where: {
            idVenta: idVenta
        },
        include: [{
                model: LibrosModel_1.default,
                as: 'LibrosVenta'
            }]
    });
    if (librosPorVenta.length > 0) {
        res.json(librosPorVenta);
    }
    else {
        res.status(404).json({
            msg: `No existen libros para una venta con id: ${idVenta}`
        });
    }
});
exports.getLibrosPorVenta = getLibrosPorVenta;
