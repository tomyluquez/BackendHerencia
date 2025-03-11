import { Router } from "express";
import { changeStatus, getFilteringOptionsSizeList, getSizeById, getSizesList, saveSize } from "../Controllers/Size.Controller";
import { authenticate, authorizeRole } from "../../Auth/Middlewares/Auth.Middleware";
import { UserRoleEnum } from "../../User/Enums/user-role-enum";

const router = Router();

router.get("/sizeList", getSizesList).get("/size", getSizeById).get("/getFilteringOptionsSizeList", getFilteringOptionsSizeList)

router.use(authenticate).use(authorizeRole([UserRoleEnum.Admin]));

router.put("/changeStatus", changeStatus).post("/saveSize", saveSize);

export { router as RouterSizes };
