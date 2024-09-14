import { Router } from "express";
import { getProductVariants, updateStock } from "../Controllers/Variant.Controller";
import { authenticate, authorizeRole } from "../Middlewares/Auth.Middleware";

const router: Router = Router();

router.get("/", getProductVariants);
router.use(authenticate).use(authorizeRole(["admin"]));
router.put("/variant", updateStock);

export { router as RouterVariants };
