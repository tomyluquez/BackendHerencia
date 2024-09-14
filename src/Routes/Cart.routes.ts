import { Router } from "express";
import { AddItemToCart, deleteItemsToCart, getCartItemsByUserId, updateQuantityCartItem } from "../Controllers/Cart.Controller";
import { authenticate, authorizeRole } from "../Middlewares/Auth.Middleware";

const router: Router = Router();

router.use(authenticate).use(authorizeRole(["admin", "customer"]));

router.get("/cartItems", getCartItemsByUserId).post("/cartItem", AddItemToCart).delete("/cartItem", deleteItemsToCart).post("/cartItems", updateQuantityCartItem);

export { router as RouterCart };
