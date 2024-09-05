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
import { Errors } from "../../Text/Errors.Messages";
import { mapProductDBToProductPagedListVM, mapProductDBToVM, mapPromotionalDBToVM } from "../../Helpers/Maps/MapProductsDBToVM";
import { GetAllProductsSearchDTO } from "../../DTO/Products/GetAllProductsSearchDTO";
import { ResponseMessages } from "../../Models/Errors/ResponseMessages.model";
import { Success } from "../../Text/Succes.Messages";

export const getAllProductsRepository = async (search: GetAllProductsSearchDTO): Promise<ProductVM> => {
    const offset = (search.Page - 1) * search.Limit;
    const productsDB = await Product.findAll({
        where: {
            ...(search.Name && { Name: { [Op.like]: `%${search.Name}%` } }),
            ...(search.IsActive && { IsActive: search.IsActive })
        },
        include: [
            {
                model: Category,
                as: "Category",
                attributes: ["Name"],
                ...(search.Categories.length > 0 && {
                    where: { Name: { [Op.in]: search.Categories } }
                })
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
        ],
        offset,
        limit: search.Limit
    });
    const products = new ProductVM();

    if (productsDB.length > 0) {
        products.Items = productsDB.map(mapProductDBToVM);
        products.TotalItems = await getTotalCountProducts(search);
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

export const getProductsPagedListRepository = async (search: ProductPagedListSearchDTO): Promise<ProductPagedListVM> => {
    const offset = (search.Page - 1) * search.Limit;

    const products = new ProductPagedListVM();
    const productsDB = await Product.findAll({
        where: {
            IsActive: true,
            ...(search.Name && { Name: { [Op.like]: `%${search.Name}%` } })
        },
        include: [
            {
                model: Category,
                as: "Category",
                attributes: ["Name"],
                ...(search.Categories.length > 0 && {
                    where: { Name: { [Op.in]: search.Categories } }
                })
            },
            {
                model: Variant,
                as: "Variants",
                attributes: ["Stock"],
                ...(search.Sizes.length > 0 && { where: { SizeId: { [Op.in]: search.Sizes } } })
            },
            {
                model: ProductImages,
                as: "Images",
                order: [["Id", "ASC"]],
                attributes: ["Url"]
            }
        ],
        offset,
        limit: search.Limit
    });
    if (productsDB.length > 0) {
        products.Items = productsDB.map(mapProductDBToProductPagedListVM);
        products.TotalItems = await getTotalCountProductsPagedList(search);
    } else products.setWarning(Errors.ProductsNotFound);

    return products;
};

export const getTotalCountProductsPagedList = async (search: ProductPagedListSearchDTO): Promise<number> => {
    // Construir condiciones de búsqueda
    const whereConditions: any = { IsActive: true };

    if (search.Name) {
        whereConditions.Name = { [Op.like]: `%${search.Name}%` };
    }

    // Aplicar filtros para las asociaciones
    if (search.Categories.length > 0) {
        whereConditions["$Category.Name$"] = { [Op.in]: search.Categories };
    }

    if (search.Sizes.length > 0) {
        whereConditions["$Variants.SizeId$"] = { [Op.in]: search.Sizes };
    }

    // Contar productos basados en las condiciones sin incluir asociaciones
    return await Product.count({
        where: whereConditions,
        include: [
            {
                model: Category,
                as: "Category",
                attributes: [],
                required: search.Categories.length > 0
            },
            {
                model: Variant,
                as: "Variants",
                attributes: [],
                required: search.Sizes.length > 0
            }
        ],
        distinct: true
    });
};

export const getTotalCountProducts = async (search: GetAllProductsSearchDTO): Promise<number> => {
    // Contar productos basados en las condiciones sin incluir asociaciones
    return await Product.count({
        where: {
            ...(search.Name && { Name: { [Op.like]: `%${search.Name}%` } }),
            ...(search.IsActive && { IsActive: search.IsActive })
        },
        include: [
            {
                model: Category,
                as: "Category",
                attributes: ["Name"],
                ...(search.Categories.length > 0 && {
                    where: { Name: { [Op.in]: search.Categories } }
                })
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
        ],
        distinct: true
    });
};

export const getProductByIdRepository = async (id: number): Promise<ProductVM> => {
    const product = new ProductVM();
    const productDB = await Product.findAll({
        where: {
            IsActive: true,
            Id: id
        },
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

    if (productDB.length > 0) {
        product.Items = productDB.map(mapProductDBToVM);
        return product;
    } else {
        product.setWarning("No se encontraron productos");
    }

    return product;
};

export const changeStatusRepsitory = async (Id: number, IsActive: boolean) => {
    let response = new ResponseMessages();
    try {
        const [affectedRows] = await Product.update(
            { IsActive }, // Valores a actualizar
            { where: { Id } } // Condición de búsqueda
        );

        // Verificamos si se actualizó alguna fila
        if (affectedRows === 0) {
            throw new Error(Errors.ProductNotFound);
        }

        response.setSuccess(Success.UpdateProduct);
    } catch (error: any) {
        response.setError(error.message);
    }
    return response;
};
