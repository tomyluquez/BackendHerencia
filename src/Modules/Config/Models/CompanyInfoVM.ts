import { ICompanyInfoVM } from "../Interfaces/ICompanyInfoVM";
import { ResponseMessages } from "../../Other/Models/ResponseMessages.model";

export class CompanyInfoVM extends ResponseMessages {
    Items: ICompanyInfoVM[];
    constructor() {
        super();
        this.Items = [];
    }
}
