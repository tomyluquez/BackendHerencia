import { IMenuVM } from "../../Interfaces/Config/IMenuVM";
import { ResponseMessages } from "../Errors/ResponseMessages.model";

export class MenuVM extends ResponseMessages {
    Items: IMenuVM[];
    constructor() {
        super();
        this.Items = [];
    }
}
