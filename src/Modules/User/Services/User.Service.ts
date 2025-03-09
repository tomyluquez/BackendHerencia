import { UserLoginDTO } from "../Dtos/UserLoginDTO";
import { UserRegisterDTO } from "../Dtos/UserRegisterDTO";
import { ResponseMessages } from "../../Other/Models/ResponseMessages.model";
import { UserProfileVM } from "../Models/UserProfileVM";
import { UserTokenVM } from "../Models/UserRegisterVM";
import { getUserProfileRepository, loginUserRepository, registerUserRepository } from "../Repositories/User.Repository";
import { Errors } from "../../Text/Errors.Messages";
import { validateIfExistsUserWhitEmail } from "../Helpers/Validators/UserValidators";

export const getUserProfileService = async (userId: number): Promise<UserProfileVM> => {
    return await getUserProfileRepository(userId);
};

export const registerUserService = async (newUser: UserRegisterDTO): Promise<ResponseMessages> => {
    const existingUserWhitEmail = await validateIfExistsUserWhitEmail(newUser.Email);

    if (existingUserWhitEmail) {
        const response = new ResponseMessages();
        response.setError(Errors.ExistingEMail);
        return response;
    }

    return await registerUserRepository(newUser);
};

export const loginUserService = async (loginUser: UserLoginDTO): Promise<UserTokenVM> => {
    return await loginUserRepository(loginUser);
};
