import { Sequelize } from "sequelize";

// Nyambungin db ke BE
const db = new Sequelize("tcc-2", "root", "yourpassword", {
  host: "34.67.252.201",
  dialect: "mysql",
});

export default db;
