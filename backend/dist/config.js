"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PORT = exports.DATABASE = exports.USER = exports.HOST = exports.PASSWORD = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
exports.PASSWORD = process.env.PASSWORD || 'admin123';
exports.HOST = process.env.HOST || 'localhost';
exports.USER = process.env.USER || 'root';
exports.DATABASE = process.env.DATABASE || 'libreria';
exports.PORT = process.env.PORT || '3000';
