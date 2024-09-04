import { Router } from "express";
import {
    getAllProducts,
    getProductsPagedLists,
    getPromocionalProducts
} from "../../Controllers/Products/Products.Controller";

const router: Router = Router();

router.get("/", getAllProducts).get("/promotional", getPromocionalProducts).get("/pagedList", getProductsPagedLists);

export { router as RouterProducts };
