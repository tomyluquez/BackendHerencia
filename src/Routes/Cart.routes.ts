import { Router } from "express";
import { AddItemToCart, deleteItemsToCart, getCartItemsByUserId, updateQuantityCartItem } from "../Controllers/Cart.Controller";
import { authenticate, authorizeRole } from "../Middlewares/Auth.Middleware";
import { RoleEnum } from "../Enums/role-enum";

const router: Router = Router();

router.use(authenticate).use(authorizeRole([RoleEnum.Admin, RoleEnum.Customer]));

router.get("/cartItems", getCartItemsByUserId)
    .post("/cartItem", AddItemToCart)
    .delete("/cartItem", deleteItemsToCart)
    .post("/cartItems", updateQuantityCartItem);

export { router as RouterCart };
