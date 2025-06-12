import { IConfigVM } from "../Interfaces/IConfigVM";
import { ResponseMessages } from "../../Other/Models/ResponseMessages.model";

export class ConfigVM extends ResponseMessages {
    Items: IConfigVM[];
    TotalItems: number;
    constructor() {
        super();
        this.Items = [];
        this.TotalItems = 0;
    }
}
