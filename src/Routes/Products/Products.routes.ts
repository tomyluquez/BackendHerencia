import { Router } from "express";
import {
  getAllActivesProducts,
  getAllProducts,
} from "../../Controllers/Products/Products.Controller";

const router: Router = Router();

router.get("/", getAllProducts).get("/actives", getAllActivesProducts);

export { router as RouterProducts };
