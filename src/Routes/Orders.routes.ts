import { Router } from "express";
import { changeStatusOrder, getOrders, getOrderStatus } from "../Controllers/Order.Controller";

const router = Router();

router.get("/", getOrders).put("/order", changeStatusOrder).get("/status", getOrderStatus);

export { router as RouterOrders };
