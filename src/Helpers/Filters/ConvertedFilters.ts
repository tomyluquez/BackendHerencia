import { RoleEnum } from "../../Enums/role-enum";

export const convertedFilters = (param: any): string[] => {
    const params = typeof param === "string" ? param : "";
    const pararmsArray = params ? params.split(",") : [];
    return pararmsArray;
};

export const convertedStatusFilter = (status: string | undefined): boolean | undefined => {
    if (!status || (status !== "active" && status !== "inactive")) {
        return undefined;
    } else {
        return status === "active" ? true : false;
    }
};

export const convertedUserRoleFilter = (userRole: number): boolean => {
    if (!userRole || (userRole !== RoleEnum.Admin && userRole !== RoleEnum.Customer)) {
        return false;
    } else {
        return userRole === RoleEnum.Admin ? true : false;
    }
};
