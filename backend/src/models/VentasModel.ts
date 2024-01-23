import { DataTypes } from "sequelize";
import db from  "../db/Connection";
import Libro from "./LibrosModel";

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
  idUsuario: {
    type: DataTypes.UUID,
    allowNull: false
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
  idLibro: {
    type: DataTypes.UUID,
    allowNull: false
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
});

Venta.belongsToMany(Libro, { through: LibrosVendidos, as: 'IdsVendidos' });

