import { Request, Response } from "express";
import {
  ProductResponse,
  ProductVM,
} from "../../Models/Products/Product.response.model";
import {
  getAllActivesProductsService,
  getAllProductsService,
} from "../../Services/Products/Products.Service";

export const getAllProducts = async (req: Request, res: Response) => {
  try {
    const products: ProductResponse = await getAllProductsService();
    res.status(200).send(products);
  } catch (error) {
    const products = new ProductResponse();
    products.AddError("Error al cargar los productos");
    res.status(500).send(products);
  }
};

export const getAllActivesProducts = async (req: Request, res: Response) => {
  try {
    const products: ProductResponse = await getAllActivesProductsService();
    res.status(200).send(products);
  } catch (error) {
    const products = new ProductResponse();
    products.AddError("Error al cargar los productos");
    res.status(500).send(products);
  }
};
