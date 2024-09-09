import { Router } from "express";
import { changeStatuts, getAllProducts, getProductById, getProductsPagedLists, getPromocionalProducts, saveProduct } from "../Controllers/Products.Controller";

const router: Router = Router();

router.get("/", getAllProducts).get("/promotional", getPromocionalProducts).get("/pagedList", getProductsPagedLists).get("/product", getProductById).put("/product", changeStatuts).post("/", saveProduct);

export { router as RouterProducts };
