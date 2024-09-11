import { Router } from "express";
import { AddItemToCart, deleteItemsToCart, getCartItemsByUserId, updateQuantityCartItem } from "../Controllers/CartController";

const router: Router = Router();

router.get("/cartItems", getCartItemsByUserId).post("/cartItem", AddItemToCart).delete("/cartItem", deleteItemsToCart).post("/cartItems", updateQuantityCartItem);

export { router as RouterCart };
