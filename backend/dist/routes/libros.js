"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const libros_1 = require("../controllers/libros");
const router = (0, express_1.Router)();
router.get('/', libros_1.getLibros);
router.get('/:id', libros_1.getLibro);
router.delete('/:id', libros_1.deleteLibro);
router.post('/', libros_1.postLibro);
router.put('/:id', libros_1.updateLibro);
exports.default = router;
