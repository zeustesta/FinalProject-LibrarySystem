import { Sequelize } from "sequelize";

const sequelize = new Sequelize('libreria', 'root', 'password', {
  host: 'localhost',
  dialect: "mysql"
})

export default sequelize;