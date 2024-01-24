"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LibrosVendidos = exports.Venta = void 0;
const sequelize_1 = require("sequelize");
const connection_1 = __importDefault(require("../db/connection"));
const LibrosModel_1 = __importDefault(require("./LibrosModel"));
var EstadoVenta;
(function (EstadoVenta) {
    EstadoVenta["PENDIENTE"] = "Pendiente";
    EstadoVenta["CONFIRMADA"] = "Confirmada";
    EstadoVenta["RECHAZADA"] = "Rechazada";
})(EstadoVenta || (EstadoVenta = {}));
exports.Venta = connection_1.default.define('Venta', {
    idVenta: {
        type: sequelize_1.DataTypes.UUID,
        defaultValue: sequelize_1.DataTypes.UUIDV4,
        primaryKey: true
    },
    idUsuario: {
        type: sequelize_1.DataTypes.UUID,
        allowNull: false
    },
    fechaCompra: {
        type: sequelize_1.DataTypes.DATE,
        allowNull: false
    },
    total: {
        type: sequelize_1.DataTypes.FLOAT,
        allowNull: false
    },
    estado: {
        type: sequelize_1.DataTypes.ENUM(...Object.values(EstadoVenta)),
        allowNull: false,
        defaultValue: EstadoVenta.PENDIENTE
    },
    createdAt: {
        type: sequelize_1.DataTypes.DATE,
        defaultValue: sequelize_1.DataTypes.NOW,
        allowNull: false
    },
    updatedAt: {
        type: sequelize_1.DataTypes.DATE,
        defaultValue: sequelize_1.DataTypes.NOW,
        allowNull: false
    }
}, {
    tableName: 'VENTAS',
});
exports.LibrosVendidos = connection_1.default.define('LibrosVendidos', {
    idLibro: {
        type: sequelize_1.DataTypes.UUID,
        allowNull: false
    },
    createdAt: {
        type: sequelize_1.DataTypes.DATE,
        defaultValue: sequelize_1.DataTypes.NOW,
        allowNull: false
    },
    updatedAt: {
        type: sequelize_1.DataTypes.DATE,
        defaultValue: sequelize_1.DataTypes.NOW,
        allowNull: false
    }
});
exports.Venta.belongsToMany(LibrosModel_1.default, { through: exports.LibrosVendidos, as: 'IdsVendidos' });
