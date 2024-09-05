import { Router } from "express";
import { changeStatuts, getAllCategories, getCategoryById, saveCategory } from "../../Controllers/Categories/Category.Controller";

const router: Router = Router();

router.get("/", getAllCategories).get("/category", getCategoryById).put("/category", changeStatuts).post("/category", saveCategory);

export { router as RouterCategories };
