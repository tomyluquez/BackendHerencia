import { Op } from "sequelize";
import { mapProductDBToVM } from "../../Helpers/Maps/Products/MapProductDBToVM";
import { ProductVM } from "../../Models/Products/ProductVM";
import Product from "../../db/Models/Products/Product.model";
import Category from "../../db/Models/Category.model";
import Variant from "../../db/Models/Variant.model";
import ProductImages from "../../db/Models/Products/ProductsImages.model";
import Size from "../../db/Models/Size.model";
import { PromotionalProductsVM } from "../../Models/Products/PromotionalProductsVM.model";
import { mapPromotionalDBToVM } from "../../Helpers/Maps/Products/MapPromotionalDBToVm";

export const getAllProductsRepository = async (
  name: string,
  categories: string[],
  IsActive?: boolean
): Promise<ProductVM> => {
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

  if (IsActive !== undefined) {
    filters.IsActive = IsActive; // Filtrado por estado exacto
  }
  console.log(filters);
  // Consulta a la base de datos con filtros
  const productsDB = await Product.findAll({
    where: filters, // Tus filtros para los productos
    include: [
      {
        model: Category,
        as: "Category",
        attributes: ["Name"],
      },
      {
        model: Variant,
        as: "Variants",
        attributes: ["Stock"],
        include: [
          {
            model: Size,
            as: "Size",
            attributes: ["Name"],
          },
        ],
      },
      {
        model: ProductImages,
        as: "Images",
      },
    ],
  });
  const products = new ProductVM();

  if (productsDB.length > 0) {
    products.Items = productsDB.map(mapProductDBToVM);
    return products;
  } else {
    products.AddWarning("No se encontraron productos");
  }

  return products;
};

export const getPromocionalProductsRepository =
  async (): Promise<PromotionalProductsVM> => {
    const filters: any = { IsActive: true, IsPromocional: true };
    const products = new PromotionalProductsVM();

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

    if (productsDB.length > 0) {
      products.Items = productsDB.map(mapPromotionalDBToVM);
    } else {
      products.AddWarning("No se encontraron productos");
    }

    return products;
  };
