import { Router } from "express";
import { changeStatuts, getAllProducts, getPriceListProducts, getProductById, getProductsPagedLists, getPromocionalProducts, saveProduct, updateAllProductsPrice, updatePriceProduct } from "../Controllers/Products.Controller";

const router: Router = Router();

router
    .get("/", getAllProducts)
    .get("/promotional", getPromocionalProducts)
    .get("/pagedList", getProductsPagedLists)
    .get("/product", getProductById)
    .put("/product", changeStatuts)
    .post("/", saveProduct)
    .get("/priceList", getPriceListProducts)
    .post("/updatePrice", updatePriceProduct)
    .post("/updateAllProductsPrice", updateAllProductsPrice);

export { router as RouterProducts };
