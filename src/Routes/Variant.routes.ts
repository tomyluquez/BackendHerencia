import { Router } from "express";
import { getProductVariants, updateStock } from "../Controllers/Variant.Controller";
import { authenticate, authorizeRole } from "../Middlewares/Auth.Middleware";
import { RoleEnum } from "../Enums/role-enum";

const router: Router = Router();

router.get("/", getProductVariants);
router.use(authenticate).use(authorizeRole([RoleEnum.Admin]));
router.put("/variant", updateStock);

export { router as RouterVariants };
