"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ClienteCarrito = exports.ClienteFavoritos = exports.Cliente = void 0;
const sequelize_1 = require("sequelize");
const connection_1 = __importDefault(require("../db/connection"));
const LibrosModel_1 = __importDefault(require("./LibrosModel"));
exports.Cliente = connection_1.default.define('Cliente', {
    idCliente: {
        type: sequelize_1.DataTypes.UUID,
        defaultValue: sequelize_1.DataTypes.UUIDV4,
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
    tableName: 'CLIENTES',
});
exports.ClienteFavoritos = connection_1.default.define('ClienteFavoritos', {
    idCliente: {
        type: sequelize_1.DataTypes.UUID,
        defaultValue: sequelize_1.DataTypes.UUIDV4,
        primaryKey: true,
        references: {
            model: exports.Cliente,
            key: 'idCliente',
        }
    },
    idLibros: {
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
    tableName: 'FAVORITOSPORCLIENTE'
});
exports.ClienteCarrito = connection_1.default.define('ClienteCarrito', {
    idCliente: {
        type: sequelize_1.DataTypes.UUID,
        defaultValue: sequelize_1.DataTypes.UUIDV4,
        primaryKey: true,
        references: {
            model: exports.Cliente,
            key: 'idCliente',
        },
    },
    idLibro: {
        type: sequelize_1.DataTypes.UUID,
        allowNull: false,
        primaryKey: true,
        references: {
            model: LibrosModel_1.default,
            key: 'idLibro',
        },
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
    tableName: 'CARRITOPORCLIENTE'
});
exports.ClienteFavoritos.belongsTo(exports.Cliente, { foreignKey: 'idCliente', as: 'ClienteFavoritos' });
exports.ClienteFavoritos.belongsTo(LibrosModel_1.default, { foreignKey: 'idLibro', as: 'LibrosFavoritos' });
exports.ClienteCarrito.belongsTo(exports.Cliente, { foreignKey: 'idCliente', as: 'ClienteCarrito' });
exports.ClienteCarrito.belongsTo(LibrosModel_1.default, { foreignKey: 'idLibro', as: 'LibrosCarrito' });
