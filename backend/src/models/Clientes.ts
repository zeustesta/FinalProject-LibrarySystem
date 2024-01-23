import { DataTypes } from "sequelize";
import db from "../db/connection";
import Libro from "./Libros";

export const Cliente = db.define('Cliente', {
  idCliente: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUID,
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
  }
}, 
{
  tableName: 'CLIENTES'
});

export const ClienteFavoritos = db.define('ClienteFavoritos', {
  libroId: {
    type: DataTypes.STRING,
    allowNull: false
  }
});

export const ClienteCarrito = db.define('ClienteCarrito', {
  libroId: {
    type: DataTypes.STRING,
    allowNull: false
  }
});

export const ClienteCompras = db.define('ClienteCompras', {
  libroId: {
    type: DataTypes.UUID,
    allowNull: false
  }
});

Cliente.belongsToMany(Libro, { through: ClienteCarrito, as: 'Carrito' });
Cliente.belongsToMany(Libro, { through: ClienteFavoritos, as: 'Favoritos' });
Cliente.belongsToMany(Libro, { through: ClienteCompras, as: 'Compras' });
