import { DataTypes, Sequelize } from "sequelize";
import db from  "../db/connection";
import Libro from "./LibrosModel";
import { Cliente } from "./ClientesModel";

export const Venta = db.define('Venta', {
  idVenta: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true
  },
  idCliente: {
    type: DataTypes.UUID,
    allowNull: false,
    references: {
      model: Cliente,
      key: 'idCliente'
    },
  },
  fechaCompra: {
    type: DataTypes.DATE,
    defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
    allowNull: false
  },
  total: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  estado: {
    type: DataTypes.STRING,
    allowNull: false,
    defaultValue: 'PENDIENTE'
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
  tableName: 'VENTAS',
});

export const LibrosVendidos = db.define('LibrosVendidos', {
  idVenta: {
    type: DataTypes.UUID,
    allowNull: false,
    primaryKey: true,
    references: {
      model: Venta,
      key: 'idVenta',
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
  tableName: 'LIBROSPORVENTA'
});

Venta.belongsTo(Cliente, { foreignKey: 'idCliente', as: 'ClienteVenta' });
Venta.hasMany(LibrosVendidos, { foreignKey: 'idVenta', as: 'LibrosVendidos' });

LibrosVendidos.belongsTo(Venta, { foreignKey: 'idVenta', as: 'VentaAsociada' }); 
LibrosVendidos.belongsTo(Libro, { foreignKey: 'idLibro', as: 'LibrosVenta' });
