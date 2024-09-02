import { Request, Response } from "express";
import { ProductResponse } from "../../Models/Products/Product.response.model";
import {
  getAllProductsService,
  getPromocionalProductsService,
} from "../../Services/Products/Products.Service";

export const getAllProducts = async (
  req: Request,
  res: Response
): Promise<any> => {
  const { name, status } = req.query;
  const categories =
    typeof req.query.categories === "string" ? req.query.categories : "";
  const categoriesArray = categories ? categories.split(",") : [];
  const IsActive =
    status === undefined || status === "" ? undefined : status === "active";

  try {
    const products: ProductResponse = await getAllProductsService(
      name as string,
      categoriesArray,
      IsActive
    );
    res.status(200).send(products);
  } catch (error) {
    const products = new ProductResponse();
    products.AddError("Error al cargar los productos");
    res.status(500).send(products);
  }
};

export const getPromocionalProducts = async (req: Request, res: Response) => {
  try {
    const products: ProductResponse = await getPromocionalProductsService();
    res.status(200).send(products);
  } catch (error) {
    const products = new ProductResponse();
    products.AddError("Error al cargar los productos");
    res.status(500).send(products);
  }
};
