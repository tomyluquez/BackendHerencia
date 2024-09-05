import { Router } from "express";
import { changeStatuts, getAllProducts, getProductById, getProductsPagedLists, getPromocionalProducts } from "../../Controllers/Products/Products.Controller";

const router: Router = Router();

router.get("/", getAllProducts).get("/promotional", getPromocionalProducts).get("/pagedList", getProductsPagedLists).get("/product", getProductById).put("/product", changeStatuts);

export { router as RouterProducts };
