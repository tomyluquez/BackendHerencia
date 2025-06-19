import { Router } from "express";
import { changeStatuts, getProductsToSale, getFilteringOptionsPagedListProduct, getFilteringOptionsPriceList, getPriceListProducts, getProductById, getProductsPagedLists, getPromocionalProducts, saveProduct, updateAllProductsPrice, updatePriceProduct, getHomeInfo } from "../Controllers/Products.Controller";
import { authenticate, authorizeRole } from "../../Auth/Middlewares/Auth.Middleware";
import { UserRoleEnum } from "../../User/Enums/user-role-enum";

const router: Router = Router();

router.get("/getProductsToSale", getProductsToSale)
    .get("/promotional", getPromocionalProducts)
    .get("/product", getProductById)
    .get("/getFilteringOptionsPagedListProduct", getFilteringOptionsPagedListProduct)
    .get("/getFilteringOptionsPriceList", getFilteringOptionsPriceList)
    .get("/getHomeInfo", getHomeInfo);

router.use(authenticate).use(authorizeRole([UserRoleEnum.Admin]));

router.put("/product", changeStatuts)
    .post("/saveProduct", saveProduct)
    .get("/pagedList", getProductsPagedLists)
    .get("/getPriceListProducts", getPriceListProducts)
    .put("/updatePriceProduct", updatePriceProduct)
    .put("/updateAllProductsPrice", updateAllProductsPrice);

export { router as RouterProducts };
