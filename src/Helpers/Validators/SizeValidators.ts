import { getSizeIdByNameRepository } from "../../Repositories/Size.Repository";

export const validateIfExistsSizeWhitName = async (name: string, SizeId: number): Promise<boolean> => {
    const existingSize = await getSizeIdByNameRepository(name.toLowerCase());

    if (!existingSize) return false;

    return existingSize !== SizeId;
};
