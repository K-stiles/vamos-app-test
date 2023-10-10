import { Request, Response, NextFunction } from "express";

import { disableSubAdmin, modifySubAdmin, readSubAdmin, readallSubAdmins } from "../services/subAdmin.service";
import { ReadSubAdminInput, UpdateSubAdminInput } from "../schema/subadmin.schema";
import { parentError } from "../functions/error";

/** get all SubAdmin */
export const getSubAdmin = async (req: Request<ReadSubAdminInput["params"]>, res: Response, next: NextFunction) => {
    const subAdminId = req.params?.subAdminId;
    try {
        const subAdmin = await readSubAdmin({ _id: subAdminId });
        if (!subAdmin) {
            throw parentError(404, "Requested account information was not found");
        }
        res.status(200).json(subAdmin);
    } catch (error) {
        next(error);
    }
};

/** get SubAdmin  */
export const getSubAdmins = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const subAdmins = await readallSubAdmins({});
        if (!subAdmins) {
            throw parentError(404, "No SubAdmin Data was found");
        }
        res.status(200).json(subAdmins);
    } catch (error) {
        next(error);
    }
};

/**  Update SubAdmin */
export const updateSubAdmin = async (req: Request<UpdateSubAdminInput["params"]>, res: Response, next: NextFunction) => {
    try {
        const subAdminId = req.params?.subAdminId;
        const update = req.body;

        const subAdmin = await readSubAdmin({ _id: subAdminId });

        if (!subAdmin) {
            throw parentError(404, "Requested account information was not found");
        }

        const updatedProduct = await modifySubAdmin({ _id: subAdminId }, update, {
            new: true
        });

        return res.status(200).json(updatedProduct);
    } catch (error) {
        next(error);
    }
};

/** Delete SubAdmin */
export const deleteSubAdmin = async (req: Request<UpdateSubAdminInput["params"]>, res: Response, next: NextFunction) => {
    const subAdminId = req.params.subAdminId;
    try {
        // const subAdmin = await readSubAdmin({ subAdminId });
        // if (!subAdmin) {
        //     return parentError(404, "Requested account information was not found");
        // }

        await disableSubAdmin({ _id: subAdminId });
        res.status(200).json("SubAdmin successfully deleted");
    } catch (error) {
        next(error);
    }
};
