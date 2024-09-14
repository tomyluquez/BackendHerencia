import { Router } from "express";
import { changeStatusOrder, getOrders, getOrderStatus } from "../Controllers/Order.Controller";
import { authenticate, authorizeRole } from "../Middlewares/Auth.Middleware";

const router = Router();
router.use(authenticate).use(authorizeRole(["admin"]));
router.get("/", getOrders).put("/order", changeStatusOrder).get("/status", getOrderStatus);

export { router as RouterOrders };
