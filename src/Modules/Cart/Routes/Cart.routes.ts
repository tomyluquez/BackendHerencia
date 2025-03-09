import { Router } from "express";
import { AddItemToCart, deleteItemsToCart, getCartItemsByUserId, updateQuantityCartItem } from "../Controllers/Cart.Controller";
import { authenticate, authorizeRole } from "../../Auth/Middlewares/Auth.Middleware";
import { UserRoleEnum } from "../../User/Enums/user-role-enum";

const router: Router = Router();

router.use(authenticate).use(authorizeRole([UserRoleEnum.Admin, UserRoleEnum.Customer]));

router.get("/cartItems", getCartItemsByUserId)
    .post("/cartItem", AddItemToCart)
    .delete("/cartItem", deleteItemsToCart)
    .post("/cartItems", updateQuantityCartItem);

export { router as RouterCart };
