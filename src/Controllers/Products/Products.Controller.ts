import { Request, Response } from "express";
import { ProductVM } from "../../Models/Products/ProductVM";
import {
  getAllProductsService,
  getPromocionalProductsService,
} from "../../Services/Products/Products.Service";
import { PromotionalProductsVM } from "../../Models/Products/PromotionalProductsVM.model";

export const getAllProducts = async (
  req: Request,
  res: Response
): Promise<ProductVM> => {
  const { name, status } = req.query;
  const categories =
    typeof req.query.categories === "string" ? req.query.categories : "";
  const categoriesArray = categories ? categories.split(",") : [];
  const IsActive =
    status === undefined || status === "" ? undefined : status === "active";

  try {
    const response = await getAllProductsService(
      name as string,
      categoriesArray,
      IsActive
    );
    res.status(200).send(response);
    return response;
  } catch (error) {
    const response = new ProductVM();
    response.AddError("Error al cargar los productos");
    res.status(500).send(response);
    return response;
  }
};

export const getPromocionalProducts = async (
  req: Request,
  res: Response
): Promise<PromotionalProductsVM> => {
  let response = new PromotionalProductsVM();
  try {
    response = await getPromocionalProductsService();
    res.status(200).send(response);
  } catch (error) {
    response.AddError("Error al cargar los productos");
    res.status(500).send(response);
  }

  return response;
};
