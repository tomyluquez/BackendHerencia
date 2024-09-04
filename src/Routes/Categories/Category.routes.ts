import { Router } from "express";
import {
    changeStatuts,
    getActivesCategories,
    getCategoryById,
    saveCategory
} from "../../Controllers/Categories/Category.Controller";

const router: Router = Router();

router
    .get("/", getActivesCategories)
    .get("/category", getCategoryById)
    .put("/category", changeStatuts)
    .post("/category", saveCategory);

export { router as RouterCategories };
