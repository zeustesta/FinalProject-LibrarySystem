import { Sequelize } from "sequelize";

const sequelize = new Sequelize('libreria', 'root', 'admin123', {
  host: 'localhost',
  dialect: "mysql"
})

export default sequelize; 