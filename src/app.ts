import "dotenv/config";
import express from "express";
import cors from "cors";
import sequelize from "./db/connectionDB.sequalize";

const PORT = process.env.PORT || 3000;

const app = express();

app.use(cors());

sequelize
  .authenticate()
  .then(() => console.log("Conectado a la base de datos."))
  .catch((error) =>
    console.error("No se pudo conectar a la base de datos:", error)
  );

app.use(express.json());

app.use("/", () => console.log("Hola mundo"));

app.listen(PORT, () => console.log("servidor corriendo en el puerto " + PORT));
