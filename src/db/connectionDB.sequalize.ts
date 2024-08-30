import { Sequelize } from "sequelize";

const sequelize = new Sequelize("herenciadb", "root", "12345", {
  host: "localhost",
  dialect: "mysql",
  port: 3306,
});

export default sequelize;
