import { ICompanyInfoVM } from "../../Interfaces/Config/ICompanyInfoVM";
import { ResponseMessages } from "../Errors/ResponseMessages.model";

export class CompanyInfoVM extends ResponseMessages {
    Items: ICompanyInfoVM[];
    constructor() {
        super();
        this.Items = [];
    }
}
