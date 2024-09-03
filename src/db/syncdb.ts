import "dotenv/config";
import sequelize from "../db/connectionDB.sequalize";
import Product from "./Models/Products/Product.model";
import Category from "./Models/Category.model";
import "./assosiations";

const models = [Product, Category];

export async function syncDatabase() {
  try {
    // Verifica la conexión
    await sequelize.authenticate();
    console.log("Conexión establecida correctamente.");

    await sequelize.sync({ force: false });

    console.log(`Tablas sincronizadas correctamente.`);
  } catch (error) {
    console.error("Error sincronizando las tablas:", error);
  }
}

// Ejecuta la sincronización
syncDatabase();
