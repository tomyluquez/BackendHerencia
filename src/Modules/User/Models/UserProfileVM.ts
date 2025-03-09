import { ResponseMessages } from "../../Other/Models/ResponseMessages.model";
import { IUserProfileVM } from "../Interfaces/IUserProfileVM";

export class UserProfileVM extends ResponseMessages {
    Item: IUserProfileVM;

    constructor() {
        super();
        this.Item = {} as IUserProfileVM;
    }
}
