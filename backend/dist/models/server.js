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
const express_1 = __importDefault(require("express"));
const libros_1 = __importDefault(require("../routes/libros"));
const connection_1 = __importDefault(require("../db/connection"));
const Ventas_1 = require("./Ventas");
const Clientes_1 = require("./Clientes");
const Libros_1 = __importDefault(require("./Libros"));
class Server {
    constructor() {
        this.app = (0, express_1.default)();
        this.port = process.env.PORT || '3001';
        this.listen();
        this.middlewares();
        this.routes();
        this.dbConnect();
    }
    listen() {
        this.app.listen(this.port, () => {
            console.log(`Aplicacion corriendo en: http://localhost:${this.port}`);
        });
    }
    routes() {
        this.app.get('/', (req, res) => {
            res.json({
                msg: 'API Working'
            });
        });
        this.app.use('/api/libros', libros_1.default);
    }
    middlewares() {
        this.app.use(express_1.default.json());
    }
    dbConnect() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield connection_1.default.authenticate();
                console.log('Base de datos conectada');
                yield Libros_1.default.sync();
                yield Clientes_1.Cliente.sync();
                yield Clientes_1.ClienteCarrito.sync();
                yield Clientes_1.ClienteCompras.sync();
                yield Clientes_1.ClienteFavoritos.sync();
                yield Ventas_1.Venta.sync();
                yield Ventas_1.LibrosVendidos.sync();
                console.log('Modelos sincronizados correctamente');
            }
            catch (error) {
                console.log(error);
                console.log('Error al conectar a la base de datos o sincronizar los modelos');
            }
        });
    }
}
exports.default = Server;
