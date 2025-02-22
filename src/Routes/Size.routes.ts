import { Router } from "express";
import { changeStatus, getSizeById, getSizesList, saveSize } from "../Controllers/Size.Controller";
import { authenticate, authorizeRole } from "../Middlewares/Auth.Middleware";
import { RoleEnum } from "../Enums/role-enum";

const router = Router();

router.get("/sizeList", getSizesList).get("/size", getSizeById);

router.use(authenticate).use(authorizeRole([RoleEnum.Admin]));

router.put("/sizeStatus", changeStatus).post("/", saveSize);

export { router as RouterSizes };
