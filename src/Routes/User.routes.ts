import { Router } from "express";
import { getUserProfile, loginUser, registerUser } from "../Controllers/User.Controller";
import { authenticate, authorizeRole } from "../Middlewares/Auth.Middleware";

const router = Router();

router.post("/register", registerUser).post("/login", loginUser);

router.use(authenticate).use(authorizeRole(["customer", "admin"]));

router.get("/userProfile", getUserProfile);

export { router as RouterUser };
