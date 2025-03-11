import { Router } from "express";
import { changeStatuts, getAllProducts, getFilteringOptionsPagedListProduct, getFilteringOptionsPriceList, getPriceListProducts, getProductById, getProductsPagedLists, getPromocionalProducts, saveProduct, updateAllProductsPrice, updatePriceProduct } from "../Controllers/Products.Controller";
import { authenticate, authorizeRole } from "../../Auth/Middlewares/Auth.Middleware";
import { UserRoleEnum } from "../../User/Enums/user-role-enum";

const router: Router = Router();

router.get("/", getAllProducts)
    .get("/promotional", getPromocionalProducts)
    .get("/pagedList", getProductsPagedLists)
    .get("/product", getProductById)
    .get("/getFilteringOptionsPagedListProduct", getFilteringOptionsPagedListProduct)
    .get("/getFilteringOptionsPriceList", getFilteringOptionsPriceList);

router.use(authenticate).use(authorizeRole([UserRoleEnum.Admin]));

router.put("/product", changeStatuts)
    .post("/saveProduct", saveProduct)
    .get("/getPriceListProducts", getPriceListProducts)
    .put("/updatePriceProduct", updatePriceProduct)
    .put("/updateAllProductsPrice", updateAllProductsPrice);

export { router as RouterProducts };
