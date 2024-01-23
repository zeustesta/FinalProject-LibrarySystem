"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ClienteCompras = exports.ClienteCarrito = exports.ClienteFavoritos = exports.Cliente = void 0;
const sequelize_1 = require("sequelize");
const connection_1 = __importDefault(require("../db/connection"));
const Libros_1 = __importDefault(require("./Libros"));
exports.Cliente = connection_1.default.define('Cliente', {
    idCliente: {
        type: sequelize_1.DataTypes.UUID,
        defaultValue: sequelize_1.DataTypes.UUID,
        primaryKey: true
    },
    nombre: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    apellido: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    email: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    password: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    rol: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    }
}, {
    tableName: 'CLIENTES'
});
exports.ClienteFavoritos = connection_1.default.define('ClienteFavoritos', {
    libroId: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false
    }
});
exports.ClienteCarrito = connection_1.default.define('ClienteCarrito', {
    libroId: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false
    }
});
exports.ClienteCompras = connection_1.default.define('ClienteCompras', {
    libroId: {
        type: sequelize_1.DataTypes.UUID,
        allowNull: false
    }
});
exports.Cliente.belongsToMany(Libros_1.default, { through: exports.ClienteCarrito, as: 'Carrito' });
exports.Cliente.belongsToMany(Libros_1.default, { through: exports.ClienteFavoritos, as: 'Favoritos' });
exports.Cliente.belongsToMany(Libros_1.default, { through: exports.ClienteCompras, as: 'Compras' });
