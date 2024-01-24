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
exports.updateVenta = exports.postVenta = exports.deleteVenta = exports.getVenta = exports.getVentas = void 0;
const VentasModel_1 = require("../models/VentasModel");
const getVentas = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const listaVentas = yield VentasModel_1.Venta.findAll();
    res.json(listaVentas);
});
exports.getVentas = getVentas;
const getVenta = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const venta = yield VentasModel_1.Venta.findByPk(id);
    if (venta) {
        res.json(venta);
    }
    else {
        res.status(404).json({
            msg: `No existe una venta con id: ${id}`
        });
    }
});
exports.getVenta = getVenta;
const deleteVenta = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const venta = yield VentasModel_1.Venta.findByPk(id);
    if (!venta) {
        res.status(404).json({
            msg: `No existe una venta con id: ${id}`
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
        console.log('No se ha podido agregar la venta');
    }
});
exports.postVenta = postVenta;
const updateVenta = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { body } = req;
    const { id } = req.params;
    try {
        const venta = yield VentasModel_1.Venta.findByPk(id);
        if (!venta) {
            res.status(404).json({
                msg: `No existe una venta con id: ${id}`
            });
        }
        else {
            yield venta.update(body);
            res.json({
                msg: 'Venta actualizada con exito'
            });
        }
    }
    catch (error) {
        console.log(error);
        console.log('No se ha podido actualizar la venta');
    }
});
exports.updateVenta = updateVenta;