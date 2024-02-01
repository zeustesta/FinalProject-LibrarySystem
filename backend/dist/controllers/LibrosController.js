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
exports.updateLibro = exports.updateCantVentasLibro = exports.postLibro = exports.deleteLibro = exports.getLibro = exports.getLibros = void 0;
const LibrosModel_1 = __importDefault(require("../models/LibrosModel"));
const getLibros = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const listaLibros = yield LibrosModel_1.default.findAll();
    res.json(listaLibros);
});
exports.getLibros = getLibros;
const getLibro = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { idLibro } = req.params;
    const libro = yield LibrosModel_1.default.findByPk(idLibro);
    if (libro) {
        res.json(libro);
    }
    else {
        res.status(404).json({
            msg: `No existe un libro con id: ${idLibro}`
        });
    }
});
exports.getLibro = getLibro;
const deleteLibro = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { idLibro } = req.params;
    const libro = yield LibrosModel_1.default.findByPk(idLibro);
    if (!libro) {
        res.status(404).json({
            msg: `No existe un libro con id: ${idLibro}`
        });
    }
    else {
        yield libro.destroy();
        res.json({
            msg: 'Libro eliminado con exito'
        });
    }
});
exports.deleteLibro = deleteLibro;
const postLibro = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { body } = req;
    try {
        yield LibrosModel_1.default.create(body);
        res.json({
            msg: 'Libro agregado con exito'
        });
    }
    catch (error) {
        console.log(error);
        console.log('No se ha podido agregar el libro');
    }
});
exports.postLibro = postLibro;
const updateCantVentasLibro = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { newCantVentas } = req.body;
    const { idLibro } = req.params;
    try {
        const libro = yield LibrosModel_1.default.findByPk(idLibro);
        if (!libro) {
            res.status(404).json({
                msg: `No existe un libro con id: ${idLibro}`
            });
        }
        else {
            libro.setDataValue('cantVentas', newCantVentas);
            yield libro.save();
            res.json({
                msg: 'Cantidad de ventas actualizada con exito'
            });
        }
    }
    catch (error) {
        console.log(error);
        console.log('No se ha podido actualizar la cantidad de ventas');
    }
});
exports.updateCantVentasLibro = updateCantVentasLibro;
const updateLibro = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { updateLibro } = req.body;
    const { idLibro } = req.params;
    try {
        const libro = yield LibrosModel_1.default.findByPk(idLibro);
        if (libro) {
            console.log('Updateando');
            console.log(updateLibro);
            // await Libro.update(updateLibro, {
            //   where: {
            //     idLibro: idLibro
            //   }
            // });
            // libro.stock = updateLibro;
            yield libro.save({ fields: ['stock'] });
            yield libro.reload();
            res.json({
                msg: 'Stock actualizado con exito'
            });
        }
        // else {
        // res.status(404).json({
        //   msg: `No existe un libro con id: ${idLibro}`
        // });
        // }
    }
    catch (error) {
        console.log(error);
        console.log('No se ha podido actualizar el stock');
    }
});
exports.updateLibro = updateLibro;
