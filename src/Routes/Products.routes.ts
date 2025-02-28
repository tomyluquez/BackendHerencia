import { Router } from "express";
import { changeStatuts, getAllProducts, getPriceListProducts, getProductById, getProductsPagedLists, getPromocionalProducts, saveProduct, updateAllProductsPrice, updatePriceProduct } from "../Controllers/Products.Controller";
import { authenticate, authorizeRole } from "../Middlewares/Auth.Middleware";
import { RoleEnum } from "../Enums/role-enum";

const router: Router = Router();

router.get("/", getAllProducts)
    .get("/promotional", getPromocionalProducts)
    .get("/pagedList", getProductsPagedLists)
    .get("/product", getProductById);

router.use(authenticate).use(authorizeRole([RoleEnum.Admin]));

router.put("/product", changeStatuts)
    .post("/", saveProduct)
    .get("/priceList", getPriceListProducts)
    .post("/updatePrice", updatePriceProduct)
    .post("/updateAllProductsPrice", updateAllProductsPrice);

export { router as RouterProducts };
