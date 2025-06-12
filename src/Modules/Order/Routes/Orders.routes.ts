import { Router } from "express";
import { changeStatusOrder, getFilteringOptionsOrderList, getOrderDetailById, getOrders, getOrderStatus, saveOrder } from "../Controllers/Order.Controller";
import { authenticate, authorizeRole } from "../../Auth/Middlewares/Auth.Middleware";
import { UserRoleEnum } from "../../User/Enums/user-role-enum";

const router = Router();

// Rutas sin autenticación
router.get("/getFilteringOptionsOrderList", getFilteringOptionsOrderList);

// Rutas que requieren autenticación y rol de Admin o Customer
router.get("/getOrders", authenticate, authorizeRole([UserRoleEnum.Admin, UserRoleEnum.Customer]), getOrders);
router.get("/getOrderDetailById", authenticate, authorizeRole([UserRoleEnum.Admin, UserRoleEnum.Customer]), getOrderDetailById);
router.get("/getOrderStatus", authenticate, authorizeRole([UserRoleEnum.Admin, UserRoleEnum.Customer]), getOrderStatus);
router.post("/saveOrder", authenticate, authorizeRole([UserRoleEnum.Admin, UserRoleEnum.Customer]), saveOrder);

// Rutas que requieren autenticación y rol de Admin
router.put("/changeStatusOrder", authenticate, authorizeRole([UserRoleEnum.Admin]), changeStatusOrder);

export { router as RouterOrders };
