import Size from "../db/Models/Size.model";
import Variant from "../db/Models/Variant.model";
import { IProductVariantsSearchDTO } from "../DTO/Variants/IProductVariantsSearchDTO";
import { mapVariantsProductDBToVM } from "../Helpers/Maps/MapVariantsDBToVM";
import { ProductVarinantsVM } from "../Models/Variant/ProductVariantsVM";

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
