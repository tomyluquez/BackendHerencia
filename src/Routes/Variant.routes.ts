import { Router } from "express";
import { getProductVariants } from "../Controllers/Variant.Controller";

const router: Router = Router();

router.get("/", getProductVariants);

export { router as RouterVariants };
