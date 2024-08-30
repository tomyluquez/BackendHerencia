import sequelize from "./connectionDB.sequalize";
import User from "../Models/User.model";
import Product from "../Models/Product.model";
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

async function syncDatabase() {
  try {
    await sequelize.sync({ force: false }); // Esto sincroniza todas las tablas
    console.log("Tablas sincronizadas.");
  } catch (error) {
    console.error("Error sincronizando las tablas:", error);
  }
}

syncDatabase();
