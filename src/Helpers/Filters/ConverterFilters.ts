export const convertedFilters = (param: any): string[] => {
    const params = typeof param === "string" ? param : "";
    const pararmsArray = params ? params.split(",") : [];
    return pararmsArray;
};
