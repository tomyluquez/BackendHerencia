import { ISizeListVM } from "../../Interfaces/Sizes/ISizeListVM";
import { ResponseMessages } from "../Errors/ResponseMessages.model";

export class SizeLlistVM extends ResponseMessages {
    Items: ISizeListVM[];
    TotalItems: number;

    constructor() {
        super();
        this.Items = [];
        this.TotalItems = 0;
    }
}
