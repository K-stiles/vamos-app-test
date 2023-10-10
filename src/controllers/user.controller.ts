import { Request, Response, NextFunction } from "express";

import { disableUser, modifyUser, readUser, readallUsers } from "../services/user.service";
import { ReadUserInput, UpdateUserInput } from "../schema/user.schema";
import { parentError } from "../functions/error";

/** get all User */
export const getUser = async (req: Request<ReadUserInput["params"]>, res: Response, next: NextFunction) => {
    const userId = req.params?.userId;
    try {
        const user = await readUser({ _id: userId });
        if (!user) {
            throw parentError(404, "Requested account information was not found");
        }
        res.status(200).json(user);
    } catch (error) {
        next(error);
    }
};

/** get User  */
export const getUsers = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const users = await readallUsers({});
        if (!users) {
            throw parentError(404, "No User Data was found");
        }
        res.status(200).json(users);
    } catch (error) {
        next(error);
    }
};

/**  Update User */
export const updateUser = async (req: Request<UpdateUserInput["params"]>, res: Response, next: NextFunction) => {
    try {
        const userId = req.params?.userId;
        const update = req.body;

        const user = await readUser({ _id: userId });

        if (!user) {
            throw parentError(404, "Requested account information was not found");
        }

        const updatedProduct = await modifyUser({ _id: userId }, update, {
            new: true
        });

        return res.status(200).json(updatedProduct);
    } catch (error) {
        next(error);
    }
};

/** Delete User */
export const deleteUser = async (req: Request<UpdateUserInput["params"]>, res: Response, next: NextFunction) => {
    const userId = req.params.userId;
    try {
        // const user = await readUser({ userId });
        // if (!user) {
        //     return parentError(404, "Requested account information was not found");
        // }

        await disableUser({ _id: userId });
        res.status(200).json("User successfully deleted");
    } catch (error) {
        next(error);
    }
};
