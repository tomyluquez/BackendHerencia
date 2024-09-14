import { IUserProfileVM } from "../../Interfaces/User/IUserProfileVM";
import { ResponseMessages } from "../Errors/ResponseMessages.model";

export class UserProfileVM extends ResponseMessages {
    Item: IUserProfileVM;

    constructor() {
        super();
        this.Item = {} as IUserProfileVM;
    }
}
