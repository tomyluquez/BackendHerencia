import { Op } from "sequelize";
import { mapProductDBToVM } from "../../Helpers/Maps/MapProductDBToVM";
import { ProductResponse } from "../../Models/Products/Product.response.model";
import Product from "../../db/Models/Product.model";
import Category from "../../db/Models/Category.model";

export const getAllProductsRepository = async (
  name: string,
  categories: string[],
  IsPromocional?: boolean
): Promise<any> => {
  const filters: any = {};

  if (name) {
    filters.name = {
      [Op.like]: `%${name}%`, // Filtrado por nombre similar (puedes cambiar a `Op.eq` para una coincidencia exacta)
    };
  }

  if (categories && categories.length > 0) {
    filters.categoryId = {
      [Op.in]: categories, // Filtrado por categorías en una lista
    };
  }

  if (IsPromocional !== undefined) {
    filters.IsPromocional = IsPromocional; // Filtrado por estado exacto
  }
  console.log(filters);
  // Consulta a la base de datos con filtros
  const productsDB = await Product.findAll({
    where: filters,
    include: [{ model: Category, as: "Category", attributes: ["Name"] }],
  });
  const products = new ProductResponse();

  if (productsDB.length > 0) {
    products.Items = productsDB.map(mapProductDBToVM);
    return products;
  } else {
    products.AddError("No se encontraron productos");
  }

  return products;
};

export const getPromocionalProductsRepository =
  async (): Promise<ProductResponse> => {
    const filters: any = { IsActive: true, IsPromocional: true };

    const productsDB = await Product.findAll({
      where: filters,
      include: [
        {
          model: Category,
          as: "Category",
          attributes: ["Name"],
        },
      ],
    });
    const products = new ProductResponse();

    if (productsDB.length > 0) {
      products.Items = productsDB.map(mapProductDBToVM);
    } else {
      products.AddError("No se encontraron productos");
    }

    return products;
  };
