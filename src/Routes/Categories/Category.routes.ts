import { Router } from "express";
import {
  getActivesCategories,
  getCategoryById,
} from "../../Controllers/Categories/Category.Controller";

const router: Router = Router();

router.get("/", getActivesCategories).get("/category", getCategoryById);

export { router as RouterCategories };
