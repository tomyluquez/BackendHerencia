import { Request, Response } from "express";
import {
  changeStatusService,
  getActivesCategoriesService,
  getCategoryByIdService,
} from "../../Services/Categories/Categories.Service";
import { CategoryListVM } from "../../Models/Category/CategoryListVM";
import { CategoryVM } from "../../Models/Category/CategoryVM";
import { ResponseMessages } from "../../Models/Errors/ResponseMessages.model";

export const getActivesCategories = async (
  req: Request,
  res: Response
): Promise<CategoryListVM> => {
  const { status } = req.query;

  const IsActive =
    status === undefined || status === "" ? undefined : status === "active";
  try {
    const response = await getActivesCategoriesService(IsActive); // Obtener la respuesta directamente del servicio
    res.status(200).send(response);
    return response;
  } catch (error) {
    const response = new CategoryListVM(); // Crear una instancia solo en caso de error
    response.AddError("Error al cargar las categorias");
    res.status(500).send(response);
    return response;
  }
};

export const getCategoryById = async (
  req: Request,
  res: Response
): Promise<CategoryVM> => {
  try {
    const { id } = req.query;
    if (!id) {
      throw new Error("El id es requerido");
    }
    const response = await getCategoryByIdService(+id);
    res.status(200).send(response);
    return response;
  } catch (error: any) {
    const response = new CategoryVM();
    response.AddError(error.message || "Error al cargar la categoria");
    res.status(500).send(response);
    return response;
  }
};

export const changeStatuts = async (
  req: Request,
  res: Response
): Promise<ResponseMessages> => {
  try {
    const { status, id } = req.body;
    let IsActive;

    if (!status || status !== "active" || status !== "inactive") {
      throw new Error("El status es requerido");
    } else {
      IsActive = status === "active" ? true : false;
    }

    const response = await changeStatusService(+id, IsActive);
    res.status(200).send(response);
    return response;
  } catch (error: any) {
    const response = new ResponseMessages();
    response.AddError(
      error.message || "Error al cambiar de estado la categoria"
    );
    res.status(500).send(response);
    return response;
  }
};
