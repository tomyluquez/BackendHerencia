import { Router } from "express";
import { changeStatuts, getAllCategories, getCategoryById, saveCategory } from "../Controllers/Category.Controller";
import { authenticate, authorizeRole } from "../Middlewares/Auth.Middleware";
import { RoleEnum } from "../Enums/role-enum";

const router: Router = Router();

router.get("/", getAllCategories).get("/category", getCategoryById);
router.use(authenticate).use(authorizeRole([RoleEnum.Admin]));
router.put("/category", changeStatuts).post("/category", saveCategory);

export { router as RouterCategories };
