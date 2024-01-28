"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LibrosVendidos = exports.Venta = exports.EstadoVenta = void 0;
const sequelize_1 = require("sequelize");
const connection_1 = __importDefault(require("../db/connection"));
const LibrosModel_1 = __importDefault(require("./LibrosModel"));
const ClientesModel_1 = require("./ClientesModel");
var EstadoVenta;
(function (EstadoVenta) {
    EstadoVenta["PENDIENTE"] = "Pendiente";
    EstadoVenta["CONFIRMADA"] = "Confirmada";
    EstadoVenta["RECHAZADA"] = "Rechazada";
})(EstadoVenta || (exports.EstadoVenta = EstadoVenta = {}));
exports.Venta = connection_1.default.define('Venta', {
    idVenta: {
        type: sequelize_1.DataTypes.UUID,
        defaultValue: sequelize_1.DataTypes.UUIDV4,
        primaryKey: true
    },
    idCliente: {
        type: sequelize_1.DataTypes.UUID,
        allowNull: false,
        references: {
            model: ClientesModel_1.Cliente,
            key: 'idCliente'
        },
    },
    fechaCompra: {
        type: sequelize_1.DataTypes.DATE,
        defaultValue: sequelize_1.Sequelize.literal('CURRENT_TIMESTAMP'),
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
    idVenta: {
        type: sequelize_1.DataTypes.UUID,
        allowNull: false,
        primaryKey: true,
        references: {
            model: exports.Venta,
            key: 'idVenta',
        }
    },
    idLibro: {
        type: sequelize_1.DataTypes.UUID,
        allowNull: false,
        primaryKey: true,
        references: {
            model: LibrosModel_1.default,
            key: 'idLibro',
        }
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
    tableName: 'LIBROSPORVENTA'
});
exports.Venta.belongsTo(ClientesModel_1.Cliente, { foreignKey: 'idCliente', as: 'ClienteVenta' });
exports.LibrosVendidos.belongsTo(exports.Venta, { foreignKey: 'idVenta', as: 'Venta' });
exports.LibrosVendidos.belongsTo(LibrosModel_1.default, { foreignKey: 'idLibro', as: 'LibrosVenta' });
