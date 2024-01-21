"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateLibro = exports.postLibro = exports.deleteLibro = exports.getLibro = exports.getLibros = void 0;
const getLibros = (req, res) => {
    res.json({
        msg: 'get Libros'
    });
};
exports.getLibros = getLibros;
const getLibro = (req, res) => {
    const { id } = req.params;
    res.json({
        msg: 'get Libro',
        id
    });
};
exports.getLibro = getLibro;
const deleteLibro = (req, res) => {
    const { id } = req.params;
    res.json({
        msg: 'delete Libro',
        id
    });
};
exports.deleteLibro = deleteLibro;
const postLibro = (req, res) => {
    const { body } = req;
    res.json({
        msg: 'post Libro',
        body
    });
};
exports.postLibro = postLibro;
const updateLibro = (req, res) => {
    const { body } = req;
    const { id } = req.params;
    res.json({
        msg: 'update Libro',
        id,
        body
    });
};
exports.updateLibro = updateLibro;
