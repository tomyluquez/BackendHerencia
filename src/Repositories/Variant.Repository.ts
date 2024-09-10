import Product from "../db/Models/Products/Product.model";
import Size from "../db/Models/Size.model";
import Variant from "../db/Models/Variant.model";
import { IProductVariantsSearchDTO } from "../DTO/Variants/IProductVariantsSearchDTO";
import { mapVariantsProductDBToVM } from "../Helpers/Maps/MapVariantsDBToVM";
import { IProductVariants } from "../Interfaces/Products/IProductsVariants";
import { ResponseMessages } from "../Models/Errors/ResponseMessages.model";
import { ProductVarinantsVM } from "../Models/Variant/ProductVariantsVM";
import { Errors } from "../Text/Errors.Messages";
import { Success } from "../Text/Succes.Messages";

export const getProductVariantsRepository = async (search: IProductVariantsSearchDTO): Promise<ProductVarinantsVM> => {
    const productVariants = new ProductVarinantsVM();
    const offset = (search.Page - 1) * search.Limit;

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
        limit: search.Limit
    });

    if (variantsDB.length > 0) {
        productVariants.Items = variantsDB.map(mapVariantsProductDBToVM);
        productVariants.TotalItems = await Variant.count({
            where: { ProductId: search.ProductId },
            include: [
                {
                    model: Size,
                    as: "Size",
                    where: { IsActive: true }
                }
            ]
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
