import { DataTypes } from "sequelize";
import db from "../db/connection"

const Libro = db.define('Libro', {
  idLibro: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUID,
    primaryKey: true
  },
  titulo: {
    type: DataTypes.STRING,
    allowNull: false
  },
  genero: {
    type: DataTypes.STRING,
    allowNull: false
  },
  autor: {
    type: DataTypes.STRING,
    allowNull: false
  },
  stock: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  precio: {
    type: DataTypes.DECIMAL(6, 2),
    allowNull: false
  },
  portada: {
    type: DataTypes.STRING,
    allowNull: true
  },
  cantVentas: {
    type: DataTypes.INTEGER,
    defaultValue: 0
  }
}, 
{
  tableName: 'LIBROS'
});

export default Libro;