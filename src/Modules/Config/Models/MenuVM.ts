import { IMenuVM } from "../Interfaces/IMenuVM";
import { ResponseMessages } from "../../Other/Models/ResponseMessages.model";

export class MenuVM extends ResponseMessages {
    Items: IMenuVM[];
    constructor() {
        super();
        this.Items = [];
    }
}
