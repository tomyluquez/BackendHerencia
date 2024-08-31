import "dotenv/config";
import express from "express";
import cors from "cors";
import sequelize from "./db/connectionDB.sequalize";
import { RouterProducts } from "./Routes/Products/Products.routes";

const PORT = process.env.SERVER_PORT || 3000;

const app = express();

app.use(cors());

sequelize
  .authenticate()
  .then(() => console.log("Conectado a la base de datos."))
  .catch((error) =>
    console.error("No se pudo conectar a la base de datos:", error)
  );

app.use(express.json());

app.use("/api/v1/products", RouterProducts);

app.use("/", (req, res) =>
  res.status(200).send('Para consumir la api utiliza la ruta "/api"')
);

app.listen(PORT, () => console.log("servidor corriendo en el puerto " + PORT));
