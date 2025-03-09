import "dotenv/config";
import express from "express";
import cors from "cors";
import sequelize from "./db/connectionDB.sequalize";
import { syncDatabase } from "./db/syncdb";
import { RouterCategories } from "./Modules/Category/Routes/Category.routes";
import { RouterVariants } from "./Modules/Variant/Routes/Variant.routes";
import { RouterCart } from "./Modules/Cart/Routes/Cart.routes";
import { RouterCheckout } from "./Modules/Checkout/Routes/Checkout.routes";
import { RouterOrders } from "./Modules/Order/Routes/Orders.routes";
import { RouterSizes } from "./Modules/Size/Routes/Size.routes";
import { RouterUser } from "./Modules/User/Routes/User.routes";
import { RouterProducts } from "./Modules/Product/Routes/Products.routes";
import { RouterConfig } from "./Modules/Config/Routes/Config.routes";

const PORT = process.env.SERVER_PORT || 3000;

const app = express();

app.use(cors());

sequelize
    .authenticate()
    .then(() => console.log("Conectado a la base de datos."))
    .catch((error) => console.error("No se pudo conectar a la base de datos:", error));

app.use(express.json());

app.use("/api/v1/products", RouterProducts);
app.use("/api/v1/categories", RouterCategories);
app.use("/api/v1/variants", RouterVariants);
app.use("/api/v1/cart", RouterCart);
app.use("/api/v1/checkout", RouterCheckout);
app.use("/api/v1/config", RouterConfig);
app.use("/api/v1/orders", RouterOrders);
app.use("/api/v1/sizes", RouterSizes);
app.use("/api/v1/users", RouterUser);

app.use("/", (req, res) => res.status(404).send("La ruta no fue encontrada"));

app.listen(PORT, () => {
    console.log("servidor corriendo en el puerto " + PORT);
    syncDatabase();
});
