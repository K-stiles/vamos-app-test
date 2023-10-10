import { Request, Response, NextFunction } from "express";

import { createAgency, disableAgency, modifyAgency, readAgency, readallAgencys } from "../services/agency.service";
import { CreateAgencyInput, ReadAgencyInput, UpdateAgencyInput } from "../schema/agency.schema";
import { parentError } from "../functions/error";

/** create Agency */
export async function addAgency(req: Request<{}, {}, CreateAgencyInput["body"]>, res: Response) {
    // const userId = res.locals.user._id;

    const body = req.body;

    const agency = await createAgency({ ...body });

    return res.send(agency);
}

/** get all Agency */
export const getAgency = async (req: Request<ReadAgencyInput["params"]>, res: Response, next: NextFunction) => {
    const agencyId = req.params?.agencyId;
    try {
        const agency = await readAgency({ _id: agencyId });
        if (!agency) {
            throw parentError(404, "Requested agency information was not found");
        }
        res.status(200).json(agency);
    } catch (error) {
        next(error);
    }
};

/** get Agency  */
export const getAgencys = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const agencys = await readallAgencys({});
        if (!agencys) {
            throw parentError(404, "No Agency Data was found");
        }
        res.status(200).json(agencys);
    } catch (error) {
        next(error);
    }
};

/**  Update Agency */
export const updateAgency = async (req: Request<UpdateAgencyInput["params"]>, res: Response, next: NextFunction) => {
    try {
        const agencyId = req.params?.agencyId;
        const update = req.body;

        const agency = await readAgency({ _id: agencyId });

        if (!agency) {
            throw parentError(404, "Requested agency information was not found");
        }

        const updatedAgency = await modifyAgency({ _id: agencyId }, update, {
            new: true
        });

        return res.status(200).json(updatedAgency);
    } catch (error) {
        next(error);
    }
};

/** Delete Agency */
export const deleteAgency = async (req: Request<UpdateAgencyInput["params"]>, res: Response, next: NextFunction) => {
    const agencyId = req.params.agencyId;
    try {
        // const agency = await readAgency({ agencyId });
        // if (!agency) {
        //     return parentError(404, "Requested account information was not found");
        // }

        await disableAgency({ _id: agencyId });
        res.status(200).json("Agency successfully deleted");
    } catch (error) {
        next(error);
    }
};
