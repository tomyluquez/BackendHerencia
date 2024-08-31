import sequelize from "./connectionDB.sequalize";
import User from "../Models/User.model";
import Product from "../Models/Products/Product.model";
import Category from "../Models/Category.model";
import Size from "../Models/Size.model";
import Cart from "../Models/Cart.model";
import CartItems from "../Models/CartItems.model";
import Order from "../Models/Order.model";
import Config from "../Models/Config.model";
import Variant from "../Models/Variant.model";
import Promotion from "../Models/Promotion.model";
import OrderItems from "../Models/OrderItems.model";
import PaymentMethod from "../Models/PaymentMethod.model";
import ShippingMethod from "../Models/ShippingMethod.model";
import OrderStatus from "../Models/OrderStatus.model";

const models = [
  User,
  Product,
  Category,
  Size,
  Cart,
  CartItems,
  Order,
  Config,
  Variant,
  Promotion,
  OrderItems,
  PaymentMethod,
  ShippingMethod,
  OrderStatus,
];

async function syncDatabase() {
  try {
    // Verifica la conexión
    await sequelize.authenticate();
    console.log("Conexión establecida correctamente.");

    // Sincroniza cada modelo
    for (const model of models) {
      await model.sync({ force: true }); // Sincroniza el modelo, eliminando y recreando la tabla si ya existe
      console.log(`Tabla ${model.name} sincronizada correctamente.`);
    }
  } catch (error) {
    console.error("Error sincronizando las tablas:", error);
  }
}

// Ejecuta la sincronización
syncDatabase();
