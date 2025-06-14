import { Router } from "express";
import { getUserProfile, getUserProfileByUserName, loginUser, registerUser } from "../Controllers/User.Controller";
import { authenticate, authorizeRole } from "../../Auth/Middlewares/Auth.Middleware";
import { UserRoleEnum } from "../Enums/user-role-enum";

const router = Router();

router.post("/register", registerUser).post("/login", loginUser);

router.use(authenticate).use(authorizeRole([UserRoleEnum.Admin, UserRoleEnum.Customer]));

router.get("/userProfile", getUserProfile)
    .get("/getUserProfileByUserName", getUserProfileByUserName);

export { router as RouterUser };
