"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const connection_1 = __importDefault(require("../db/connection"));
const Libro = connection_1.default.define('Libro', {
    idLibro: {
        type: sequelize_1.DataTypes.UUID,
        defaultValue: sequelize_1.DataTypes.UUID,
        primaryKey: true
    },
    titulo: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false
    },
    genero: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false
    },
    autor: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false
    },
    stock: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false
    },
    precio: {
        type: sequelize_1.DataTypes.DECIMAL(6, 2),
        allowNull: false
    },
    portada: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true
    },
    cantVentas: {
        type: sequelize_1.DataTypes.INTEGER,
        defaultValue: 0
    }
}, {
    tableName: 'LIBROS'
});
exports.default = Libro;
