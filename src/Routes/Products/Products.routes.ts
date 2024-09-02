import { Router } from "express";
import {
  getAllProducts,
  getPromocionalProducts,
} from "../../Controllers/Products/Products.Controller";

const router: Router = Router();

router.get("/", getAllProducts).get("/promocional", getPromocionalProducts);

export { router as RouterProducts };
