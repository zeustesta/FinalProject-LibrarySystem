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
exports.seedDatabase = void 0;
const LibrosModel_1 = __importDefault(require("../models/LibrosModel"));
const urlApi = 'https://gutendex.com/books/?page=4';
const imageNotFound = 'https://upload.wikimedia.org/wikipedia/commons/a/a3/Image-not-found.png';
function seedDatabase() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const data = yield (yield (fetch(urlApi))).json();
            const results = data.results;
            for (let i = 0; i < results.length; i++) {
                if (results[i].authors[0] !== undefined) {
                    if (results[i].formats["image/jpeg"] == null) {
                        populateBooksTable(results[i].title, results[i].authors[0].name, imageNotFound);
                    }
                    else {
                        populateBooksTable(results[i].title, results[i].authors[0].name, results[i].formats["image/jpeg"]);
                    }
                }
            }
            console.log('Base de datos poblada correctamente');
        }
        catch (error) {
            console.log(error);
            console.log('No se ha podido poblar la base de datos');
        }
    });
}
exports.seedDatabase = seedDatabase;
function populateBooksTable(titulo, autor, portada) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const genero = randGenre();
            const stock = Math.floor(Math.random() * (15 - 3 + 1)) + 3;
            const cantVenta = 0;
            const precio = Math.floor(Math.random() * (15000 - 5000 + 1)) + 5000;
            yield LibrosModel_1.default.create({
                titulo: titulo,
                genero: genero,
                autor: autor,
                stock: stock,
                precio: precio,
                portada: portada,
                cantVenta: cantVenta
            });
        }
        catch (error) {
            console.log(error);
            console.log('No se ha podido almacenar el libro');
        }
    });
}
function randGenre() {
    const generos = ['Horror', 'Fantasía', 'Ciencia Ficción', 'Drama', 'Suspenso', 'Aventura', 'Policial', 'Paranormal', 'Poesía'];
    return generos[Math.floor(Math.random() * (9 - 1 + 1))];
}
