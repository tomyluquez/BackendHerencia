import { UserLoginDTO } from "../DTO/User/UserLoginDTO";
import { UserRegisterDTO } from "../DTO/User/UserRegisterDTO";
import { validateIfExistsUserWhitEmail } from "../Helpers/Validators/UserValidators";
import { ResponseMessages } from "../Models/Errors/ResponseMessages.model";
import { UserProfileVM } from "../Models/User/UserProfileVM";
import { UserTokenVM } from "../Models/User/UserRegisterVM";
import { getUserProfileRepository, loginUserRepository, registerUserRepository } from "../Repositories/User.Repository";
import { Errors } from "../Text/Errors.Messages";

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
