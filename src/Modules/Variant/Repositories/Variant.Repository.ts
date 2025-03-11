import { Op } from "sequelize";
import { IProductVariantsSearchDTO } from "../Dtos/IProductVariantsSearchDTO";
import { ProductVarinantsVM } from "../Models/ProductVariantsVM";
import Variant from "../../../db/Models/Variant.model";
import Size from "../../../db/Models/Size.model";
import { mapProductsStockDBToVM, mapVariantDBToSize, mapVariantsProductDBToVM } from "../Helpers/Maps/MapVariantsDBToVM";
import { SearchProductsStockPagedListDTO } from "../Interfaces/Variants.interfaces";
import { ProductStockVM } from "../Models/ProductStock.VM";
import Product from "../../../db/Models/Products/Product.model";
import { ResponseMessages } from "../../Other/Models/ResponseMessages.model";
import { Errors } from "../../Text/Errors.Messages";
import { Success } from "../../Text/Succes.Messages";
import { IProductVariants } from "../../Product/Interfaces/IProductsVariants";
import { ISizeListVM } from "../../Size/Interfaces/ISizeListVM";

export const getProductVariantsRepository = async (search: IProductVariantsSearchDTO): Promise<ProductVarinantsVM> => {
    const productVariants = new ProductVarinantsVM();
    const offset = (search.Pagination.Page - 1) * search.Pagination.Limit;

    const variantsDB = await Variant.findAll({
        where: { ProductId: search.ProductId },
        include: [
            {
                model: Size,
                as: "Size",
                attributes: ["Name"],
                where: { IsActive: true }
            }
        ],
        offset,
        limit: search.Pagination.Limit
    });

    if (variantsDB.length > 0) {
        productVariants.Items = variantsDB.map(mapVariantsProductDBToVM);
        productVariants.TotalItems = await Variant.count({
            where: { ProductId: search.ProductId },
        });
    } else {
        productVariants.setWarning("No se encontraron variantes");
    }

    return productVariants;
};

export const getProductsStockRepository = async (search: SearchProductsStockPagedListDTO): Promise<ProductStockVM> => {
    const productVariants = new ProductStockVM();
    const offset = (search.Pagination.Page - 1) * search.Pagination.Limit;

    const variantsDB = await Variant.findAll({
        include: [
            {
                model: Size,
                as: "Size",
                attributes: ["Name"],
                where: {
                    IsActive: true,
                    ...(search.SizeId && { Id: search.SizeId })
                }
            },
            {
                model: Product,
                as: "Product",
                attributes: ["Name", "Cost"],
                where: {
                    ...(search.Status !== undefined && { IsActive: search.Status }),
                    ...(search.CategoryId && { CategoryId: search.CategoryId }),
                    ...(search.ProductName && { Name: { [Op.like]: `%${search.ProductName}%` } })
                }
            }
        ],
        offset,
        limit: search.Pagination.Limit
    });

    if (variantsDB.length > 0) {
        productVariants.Items = variantsDB.map(mapProductsStockDBToVM);
        productVariants.TotalItems = await Variant.count({
            include: [
                {
                    model: Size,
                    as: "Size",
                    attributes: ["Name"],
                    where: {
                        IsActive: true,
                        ...(search.SizeId && { Id: search.SizeId })
                    }
                },
                {
                    model: Product,
                    as: "Product",
                    attributes: ["Name", "Cost"],
                    where: {
                        ...(search.Status !== undefined && { IsActive: search.Status }),
                        ...(search.ProductName && { Name: { [Op.like]: `%${search.ProductName}%` } })
                    }
                }
            ],
        });
    } else {
        productVariants.setWarning("No se encontraron variantes");
    }

    return productVariants;
};

export const updateStockRepository = async (id: number, quantity: number): Promise<ResponseMessages> => {
    const response = new ResponseMessages();
    const [affectedRows] = await Variant.update({ Stock: quantity }, { where: { Id: id } });

    if (affectedRows === 0) {
        response.setError(Errors.UpdateStock);
        return response;
    }

    response.setSuccess(Success.UpdateStock);
    return response;
};

export const getVariantByIdRepository = async (id: number): Promise<IProductVariants | null> => {
    const variantDB = await Variant.findOne({
        where: { Id: id },
        include: [
            {
                model: Product,
                as: "Product",
                attributes: ["Name", "Price"]
            },
            {
                model: Size,
                as: "Size",
                attributes: ["Name"]
            }
        ]
    });
    if (!variantDB) return null;
    const variant = mapVariantsProductDBToVM(variantDB);
    return variant;
};

export const getVariantBySizeIdRepository = async (sizeId: number): Promise<ISizeListVM | null> => {
    const variantDB = await Variant.findOne({
        include: [
            {
                model: Size,
                as: "Size",
                where: { Id: sizeId, IsActive: true }
            }
        ]
    });
    if (!variantDB) return null;
    const size = mapVariantDBToSize(variantDB);
    return size;
};