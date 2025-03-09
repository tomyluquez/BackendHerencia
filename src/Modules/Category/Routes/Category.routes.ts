import { Router } from "express";
import { changeStatus, getAllCategories, getCategoryById, getFilteringOptionsCategoryList, saveCategory } from "../Controllers/Category.Controller";
import { authenticate, authorizeRole } from "../../Auth/Middlewares/Auth.Middleware";
import { UserRoleEnum } from "../../User/Enums/user-role-enum";

const router: Router = Router();

router.get("/", getAllCategories).get("/category", getCategoryById).get("/getFilteringOptionsCategoryList", getFilteringOptionsCategoryList);
router.use(authenticate).use(authorizeRole([UserRoleEnum.Admin]));
router.put("/changeStatus", changeStatus).post("/saveCategory", saveCategory);

export { router as RouterCategories };
