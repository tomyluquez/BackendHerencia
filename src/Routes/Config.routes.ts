import { Router } from "express";
import { getCompanyInfo, getConfig, getMenu, saveCompanyInfo } from "../Controllers/Config.Controller";

const router = Router();

router.get("/companyInfo", getCompanyInfo).get("/menuInfo", getMenu).get("/configInfo", getConfig).post("/companyInfo", saveCompanyInfo);

export { router as RouterConfig };
