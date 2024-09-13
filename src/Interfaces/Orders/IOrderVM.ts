import { IOrderStatusVM } from "./IOrderStatusVM";

export interface IOrderVM {
    OrderNumber: number;
    DateCreated: Date;
    customerName: string;
    Status: IOrderStatusVM;
}
