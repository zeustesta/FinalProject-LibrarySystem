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
exports.seedClients = void 0;
const ClientesModel_1 = require("../models/ClientesModel");
function seedClients() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            yield ClientesModel_1.Cliente.create({
                nombre: "admin",
                apellido: "admin",
                email: "admin@gmail.com",
                password: "admin",
                rol: "ADMIN"
            });
            yield ClientesModel_1.Cliente.create({
                nombre: "usuario",
                apellido: "usuario",
                email: "user@gmail.com",
                password: "usuario",
                rol: "USER"
            });
        }
        catch (error) {
            console.log(error);
            console.log('No se han podido crear los clientes');
        }
    });
}
exports.seedClients = seedClients;
