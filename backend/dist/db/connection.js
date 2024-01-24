"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const config_1 = require("../config");
const sequelize = new sequelize_1.Sequelize(config_1.DATABASE, config_1.USER, config_1.PASSWORD, {
    host: config_1.HOST,
    dialect: "mysql"
});
exports.default = sequelize;
