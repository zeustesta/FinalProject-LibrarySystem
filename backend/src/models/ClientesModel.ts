import { DataTypes } from "sequelize";
import db from "../db/connection";
import Libro from "./LibrosModel";

export const Cliente = db.define('Cliente', {
  idCliente: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true
  }, 
  nombre: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  apellido: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  rol: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  createdAt: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
    allowNull: false
  },
  updatedAt: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW, 
    allowNull: false
  }
}, 
{
  tableName: 'CLIENTES',
});

export const ClienteFavoritos = db.define('ClienteFavoritos', {
  idCliente: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
    references: {
      model: Cliente,
      key: 'idCliente',
    }
  }, 
  idLibro: {
    type: DataTypes.UUID,
    allowNull: false,
    primaryKey: true,
    references: {
      model: Libro,
      key: 'idLibro',
    }
  },
  createdAt: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
    allowNull: false
  },
  updatedAt: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW, 
    allowNull: false
  }
}, 
{
  tableName: 'FAVORITOSPORCLIENTE'
});

export const ClienteCarrito = db.define('ClienteCarrito', {
  idCliente: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
    references: {
      model: Cliente,
      key: 'idCliente'
    },
  }, 
  idLibro: {
    type: DataTypes.UUID,
    allowNull: false,
    primaryKey: true,
    references: {
      model: Libro,
      key: 'idLibro',
    },
  },
  createdAt: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
    allowNull: false
  },
  updatedAt: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW, 
    allowNull: false
  }
}, 
{
  tableName: 'CARRITOPORCLIENTE'
});

ClienteFavoritos.belongsTo(Cliente, { foreignKey: 'idCliente', as: 'ClienteFavoritos' });
ClienteFavoritos.belongsTo(Libro, { foreignKey: 'idLibro', as: 'LibrosFavoritos' });

ClienteCarrito.belongsTo(Cliente, { foreignKey: 'idCliente', as: 'ClienteCarrito' });
ClienteCarrito.belongsTo(Libro, { foreignKey: 'idLibro', as: 'LibrosCarrito' });