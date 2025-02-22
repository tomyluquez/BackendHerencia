import { Router } from "express";
import { getCompanyInfo, getConfig, getMenu, saveCompanyInfo, saveConfigInfo } from "../Controllers/Config.Controller";
import { authenticate, authorizeRole } from "../Middlewares/Auth.Middleware";
import { RoleEnum } from "../Enums/role-enum";

const router = Router();

router.get("/companyInfo", getCompanyInfo).get("/menuInfo", getMenu).get("/configInfo", getConfig);

router.use(authenticate).use(authorizeRole([RoleEnum.Admin]));

router.post("/companyInfo", saveCompanyInfo).post("/configInfo", saveConfigInfo);

export { router as RouterConfig };
