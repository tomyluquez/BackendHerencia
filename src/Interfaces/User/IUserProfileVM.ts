import { IOrderDetailVM } from "../Orders/IOrderDetailVM";

export interface IUserProfileVM {
    Id: number;
    Name: string;
    Image?: string | null;
    Mail: string;
    DateCreated: Date;
    Oders: IOrderDetailVM[];
}
