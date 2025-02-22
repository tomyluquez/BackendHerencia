import { Request, Response } from "express";
import { UserProfileVM } from "../Models/User/UserProfileVM";
import { Errors } from "../Text/Errors.Messages";
import { getUserProfileService, loginUserService, registerUserService } from "../Services/User.Service";
import { ResponseMessages } from "../Models/Errors/ResponseMessages.model";
import { mapUserLoginBodyToDTO, mapUserRegisterBodyToDTO } from "../Helpers/Maps/MapUser";
import { UserTokenVM } from "../Models/User/UserRegisterVM";

export const getUserProfile = async (req: Request, res: Response): Promise<UserProfileVM> => {
    const { userId } = req.query;
    try {
        if (!userId) {
            throw new Error(Errors.IdRequired);
        }
        const response = await getUserProfileService(+userId);
        res.status(200).send(response);
        return response;
    } catch (error: any) {
        const response = new UserProfileVM();
        response.setError(error.message || Errors.UserProfile);
        res.status(error.message ? 400 : 500).send(response);
        return response;
    }
};

export const registerUser = async (req: Request, res: Response): Promise<ResponseMessages> => {
    const { userName, email, password, role } = req.body;
    try {
        if (!userName) throw new Error(Errors.UserNameRequired);
        if (!email) throw new Error(Errors.UserEmailRequired);
        if (!password) throw new Error(Errors.UserPassRequired);
        const newUser = mapUserRegisterBodyToDTO(userName, email, password, Number(role));
        const response = await registerUserService(newUser);
        res.status(200).send(response);
        return response;
    } catch (error: any) {
        const response = new ResponseMessages();
        response.setError(error.message || Errors.UserRegister);
        res.status(error.message ? 400 : 500).send(response);
        return response;
    }
};

export const loginUser = async (req: Request, res: Response): Promise<UserTokenVM> => {
    const { email, password } = req.body;
    try {
        if (!email) throw new Error(Errors.UserEmailRequired);
        if (!password) throw new Error(Errors.UserPassRequired);
        const loginUser = mapUserLoginBodyToDTO(email, password);
        const response = await loginUserService(loginUser);
        res.status(200).send(response);
        return response;
    } catch (error: any) {
        const response = new UserTokenVM();
        response.setError(error.message || Errors.UserLogin);
        res.status(error.message ? 400 : 500).send(response);
        return response;
    }
};
