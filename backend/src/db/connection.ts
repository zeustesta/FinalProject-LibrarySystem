import { Sequelize } from "sequelize";

const sequelize = new Sequelize('libreria', 'root', 'Giselamiguel1', {
  host: 'localhost',
  dialect: "mysql"
})

export default sequelize; 