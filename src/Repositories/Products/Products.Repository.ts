import { Op } from "sequelize";
import { ProductVM } from "../../Models/Products/ProductVM";
import Product from "../../db/Models/Products/Product.model";
import Category from "../../db/Models/Category.model";
import Variant from "../../db/Models/Variant.model";
import ProductImages from "../../db/Models/Products/ProductsImages.model";
import Size from "../../db/Models/Size.model";
import { PromotionalProductsVM } from "../../Models/Products/PromotionalProductsVM.model";
import { ProductPagedListSearchDTO } from "../../DTO/Products/ProductPagedListSearchDTO";
import { ProductPagedListVM } from "../../Models/Products/ProductPagedListVM";
import { Errors } from "../../Helpers/Errors/Messages";
import {
    mapProductDBToProductPagedListVM,
    mapProductDBToVM,
    mapPromotionalDBToVM
} from "../../Helpers/Maps/MapProductsDBToVM";

export const getAllProductsRepository = async (
    name: string,
    categories: string[],
    IsActive?: boolean
): Promise<ProductVM> => {
    const filters: any = {};

    if (name) {
        filters.name = {
            [Op.like]: `%${name}%` // Filtrado por nombre similar (puedes cambiar a `Op.eq` para una coincidencia exacta)
        };
    }

    if (categories && categories.length > 0) {
        filters.categoryId = {
            [Op.in]: categories // Filtrado por categorías en una lista
        };
    }

    if (IsActive !== undefined) {
        filters.IsActive = IsActive; // Filtrado por estado exacto
    }

    // Consulta a la base de datos con filtros
    const productsDB = await Product.findAll({
        where: filters, // Tus filtros para los productos
        include: [
            {
                model: Category,
                as: "Category",
                attributes: ["Name"]
            },
            {
                model: Variant,
                as: "Variants",
                attributes: ["Stock"],
                include: [
                    {
                        model: Size,
                        as: "Size",
                        attributes: ["Name"]
                    }
                ]
            },
            {
                model: ProductImages,
                as: "Images",
                attributes: ["Url"]
            }
        ]
    });
    const products = new ProductVM();

    if (productsDB.length > 0) {
        products.Items = productsDB.map(mapProductDBToVM);
        return products;
    } else {
        products.setWarning("No se encontraron productos");
    }

    return products;
};

export const getPromocionalProductsRepository = async (): Promise<PromotionalProductsVM> => {
    const filters: any = { IsActive: true, IsPromocional: true };
    const products = new PromotionalProductsVM();

    const productsDB = await Product.findAll({
        where: filters,
        include: [
            {
                model: Category,
                as: "Category",
                attributes: ["Name"]
            },
            {
                model: ProductImages,
                as: "Images",
                attributes: ["Url"]
            }
        ]
    });

    if (productsDB.length > 0) {
        products.Items = productsDB.map(mapPromotionalDBToVM);
    } else {
        products.setWarning("No se encontraron productos");
    }

    return products;
};

export const getProductsPagedListRepository = async (
    search: ProductPagedListSearchDTO
): Promise<ProductPagedListVM> => {
    console.log(search);
    const products = new ProductPagedListVM();
    const productsDB = await Product.findAll({
        where: {
            IsActive: true,
            ...(search.name && { Name: { [Op.like]: `%${search.name}%` } })
        },
        include: [
            {
                model: Category,
                as: "Category",
                attributes: ["Name"],
                required: false,
                ...(search.categories.length > 0 && {
                    where: { Name: { [Op.like]: `%${search.categories.join("%")}%` } }
                })
            },
            {
                model: Variant,
                as: "Variants",
                attributes: ["Stock"],
                required: false,
                ...(search.sizes.length > 0 && { where: { SizeId: { [Op.in]: search.sizes } } })
            },
            {
                model: ProductImages,
                as: "Images",
                order: [["Id", "ASC"]],
                attributes: ["Url"]
            }
        ]
    });
    if (productsDB.length > 0) {
        products.Items = productsDB.map(mapProductDBToProductPagedListVM);
    } else products.setWarning(Errors.ProductsNotFound);

    return products;
};
