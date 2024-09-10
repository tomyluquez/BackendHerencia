import { Router } from "express";
import { getProductVariants, updateStock } from "../Controllers/Variant.Controller";

const router: Router = Router();

router.get("/", getProductVariants).put("/variant", updateStock);

export { router as RouterVariants };
