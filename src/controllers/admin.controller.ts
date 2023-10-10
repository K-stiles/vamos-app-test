import { Request, Response, NextFunction } from "express";

import { disableAdmin, modifyAdmin, readAdmin, readallAdmins } from "../services/admin.service";
import { ReadAdminInput, UpdateAdminInput } from "../schema/admin.schema";
import { parentError } from "../functions/error";

/** get all Admin */
export const getAdmin = async (req: Request<ReadAdminInput["params"]>, res: Response, next: NextFunction) => {
    const adminId = req.params?.adminId;
    try {
        const admin = await readAdmin({ _id: adminId });
        if (!admin) {
            throw parentError(404, "Requested account information was not found");
        }
        res.status(200).json(admin);
    } catch (error) {
        next(error);
    }
};

/** get Admin  */
export const getAdmins = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const admins = await readallAdmins({});
        if (!admins) {
            throw parentError(404, "No Admin Data was found");
        }
        res.status(200).json(admins);
    } catch (error) {
        next(error);
    }
};

/**  Update Admin */
export const updateAdmin = async (req: Request<UpdateAdminInput["params"]>, res: Response, next: NextFunction) => {
    try {
        const adminId = req.params?.adminId;
        const update = req.body;

        const admin = await readAdmin({ _id: adminId });

        if (!admin) {
            throw parentError(404, "Requested account information was not found");
        }

        const updatedProduct = await modifyAdmin({ _id: adminId }, update, {
            new: true
        });

        return res.status(200).json(updatedProduct);
    } catch (error) {
        next(error);
    }
};

/** Delete Admin */
export const deleteAdmin = async (req: Request<UpdateAdminInput["params"]>, res: Response, next: NextFunction) => {
    const adminId = req.params.adminId;
    try {
        // const admin = await readAdmin({ adminId });
        // if (!admin) {
        //     return parentError(404, "Requested account information was not found");
        // }

        await disableAdmin({ _id: adminId });
        res.status(200).json("Admin successfully deleted");
    } catch (error) {
        next(error);
    }
};
