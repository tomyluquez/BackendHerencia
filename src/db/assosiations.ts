import Cart from "./Models/Cart/Cart.model";
import CartItems from "./Models/Cart/CartItems.model";
import Category from "./Models/Category.model";
import Product from "./Models/Products/Product.model";
import User from "./Models/User.model";
import Variant from "./Models/Variant.model";
import Size from "./Models/Size.model";
import Order from "./Models/Order/Order.model";
import Promotion from "./Models/Promotion.model";
import PaymentMethod from "./Models/PaymentMethod.model";
import OrderStatus from "./Models/Order/OrderStatus.model";
import OrderItems from "./Models/Order/OrderItems.model";
import ProductImages from "./Models/Products/ProductsImages.model";
import ShippingMethod from "./Models/Shipping/ShippingMethod.model";
import Shipping from "./Models/Shipping/Shipping.model";

// Asociación de uno a muchos
Product.belongsTo(Category, {
  foreignKey: "CategoryId",
  as: "Category",
});

ProductImages.belongsTo(Product, {
  foreignKey: "ProductId",
  as: "Product",
});

Cart.belongsTo(User, {
  foreignKey: "UserId",
  as: "User",
});

CartItems.belongsTo(Cart, {
  foreignKey: "CartId",
  as: "Cart",
});

CartItems.belongsTo(Variant, {
  foreignKey: "VariantId",
  as: "Variant",
});

Order.belongsTo(User, {
  foreignKey: "UserId",
  as: "User",
});
Order.belongsTo(Promotion, {
  foreignKey: "PromotionId",
  as: "Promotion",
});
Order.belongsTo(PaymentMethod, {
  foreignKey: "PaymentMethodId",
  as: "PaymentMethod",
});
Order.belongsTo(ShippingMethod, {
  foreignKey: "ShippingMethodId",
  as: "ShippingMethod",
});
Order.belongsTo(OrderStatus, {
  foreignKey: "OrderStatusId",
  as: "OrderStatus",
});

Variant.belongsTo(Product, { foreignKey: "ProductId", as: "Product" });

Variant.belongsTo(Size, { foreignKey: "SizeId", as: "Size" });

OrderItems.belongsTo(Order, {
  foreignKey: "OrderId",
  as: "Order",
});
OrderItems.belongsTo(Variant, {
  foreignKey: "VariantId",
  as: "Variant",
});

Shipping.belongsTo(Order, {
  foreignKey: "OrderId",
  as: "Order",
});

// Asociación de muchos a uno
Category.hasMany(Product);
User.hasMany(Cart);
Cart.hasMany(CartItems);
Variant.hasMany(CartItems);
Product.hasMany(Variant, {
  foreignKey: "ProductId",
  as: "Variants",
});
Product.hasMany(ProductImages, {
  foreignKey: "ProductId",
  as: "Images",
});
Size.hasMany(Variant);
User.hasMany(Order);
Promotion.hasMany(Order);
PaymentMethod.hasMany(Order);
ShippingMethod.hasMany(Order);
OrderStatus.hasMany(Order);
Order.hasMany(OrderItems);
Variant.hasMany(OrderItems);
Order.hasOne(Shipping);
