import { DataTypes } from "sequelize";
import db from  "../db/connection";
import Libro from "./LibrosModel";
import { Cliente } from "./ClientesModel";

enum EstadoVenta{
  PENDIENTE = 'Pendiente',
  CONFIRMADA = 'Confirmada', 
  RECHAZADA = 'Rechazada'
}

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
      model: Cliente, // La tabla a la que hace referencia
      key: 'idCliente', // El campo en la tabla a la que hace referencia
    },
  },
  fechaCompra: {
    type: DataTypes.DATE,
    allowNull: false
  },
  total: {
    type: DataTypes.FLOAT,
    allowNull: false
  },
  estado: {
    type: DataTypes.ENUM(...Object.values(EstadoVenta)),
    allowNull: false,
    defaultValue: EstadoVenta.PENDIENTE
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
  // idVenta: {
  //   type: DataTypes.UUID,
  //   allowNull: false
  // },
  // idLibro: {
  //   type: DataTypes.UUID,
  //   allowNull: false
  // },
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
});

Venta.belongsToMany(Libro, { through: LibrosVendidos, as: 'IdsVendidos' });

