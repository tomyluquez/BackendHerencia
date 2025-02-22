import { Router } from "express";
import { getUserProfile, loginUser, registerUser } from "../Controllers/User.Controller";
import { authenticate, authorizeRole } from "../Middlewares/Auth.Middleware";
import { RoleEnum } from "../Enums/role-enum";

const router = Router();

router.post("/register", registerUser).post("/login", loginUser);

router.use(authenticate).use(authorizeRole([RoleEnum.Admin, RoleEnum.Customer]));

router.get("/userProfile", getUserProfile);

export { router as RouterUser };
