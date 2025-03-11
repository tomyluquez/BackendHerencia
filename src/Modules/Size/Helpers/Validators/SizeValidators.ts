import { getVariantBySizeIdRepository } from "../../../Variant/Repositories/Variant.Repository";
import { ISizeListVM } from "../../Interfaces/ISizeListVM";
import { SizeVM } from "../../Models/SizeVM";
import { getSizeByIdRepository, getSizeIdByNameRepository } from "../../Repositories/Size.Repository";

export const validateIfExistsSizeWhitName = async (name: string, SizeId: number): Promise<boolean> => {
    const existingSize = await getSizeIdByNameRepository(name.toLowerCase());

    if (!existingSize) return false;

    return existingSize !== SizeId;
};



export const validateHasProductsWhitSize = async (id: number): Promise<boolean> => {
    const size: ISizeListVM | null = await getVariantBySizeIdRepository(id);
    return !!size;
};
