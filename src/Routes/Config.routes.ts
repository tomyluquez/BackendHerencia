import { Router } from "express";
import { getCompanyInfo, getConfig, getMenu, saveCompanyInfo, saveConfigInfo } from "../Controllers/Config.Controller";
import { authenticate, authorizeRole } from "../Middlewares/Auth.Middleware";

const router = Router();

router.get("/companyInfo", getCompanyInfo).get("/menuInfo", getMenu).get("/configInfo", getConfig);

router.use(authenticate).use(authorizeRole(["admin"]));

router.post("/companyInfo", saveCompanyInfo).post("/configInfo", saveConfigInfo);

export { router as RouterConfig };
