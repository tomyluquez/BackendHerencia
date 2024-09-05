export interface GetAllProductsSearchDTO {
    Name: string;
    Categories: string[];
    IsActive?: boolean | undefined;
    Page: number;
    Limit: number;
}
