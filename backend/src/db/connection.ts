import { Sequelize } from "sequelize";
import { DATABASE, HOST, PASSWORD, USER } from "../config";


const sequelize = new Sequelize(DATABASE, USER, PASSWORD, {
  host: HOST,
  dialect: "mysql"
});

export default sequelize;