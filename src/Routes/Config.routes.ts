import { Router } from "express";
import { getCompanyInfo, getConfig, getMenu, saveCompanyInfo, saveConfigInfo } from "../Controllers/Config.Controller";

const router = Router();

router.get("/companyInfo", getCompanyInfo).get("/menuInfo", getMenu).get("/configInfo", getConfig).post("/companyInfo", saveCompanyInfo).post("/configInfo", saveConfigInfo);

export { router as RouterConfig };
