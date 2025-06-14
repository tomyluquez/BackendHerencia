import { IOrderUser } from "../../Order/Interfaces/IOrderDetailVM";

export interface IUserProfileVM {
    Id: number;
    Name: string;
    Image?: string | null;
    Mail: string;
    Addres: string;
    Phone: number;
    DateCreated: Date;
    Orders?: IOrderUser[];
}
