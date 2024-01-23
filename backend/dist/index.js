"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ServerModel_1 = __importDefault(require("./models/ServerModel"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const server = new ServerModel_1.default();
// seedDatabase(); //USADO PARA BAJAR LA INFO A LA BASE DE DATOS
