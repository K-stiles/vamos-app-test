import { Request, Response, NextFunction } from "express";

import { createTrip, disableTrip, modifyTrip, readTrip, readallTrips } from "../services/trip.service";
import { CreateTripInput, ReadTripInput, UpdateTripInput } from "../schema/trip.schema";
import { parentError } from "../functions/error";

/** create Trip */
export async function addTrip(req: Request<{}, {}, CreateTripInput["body"]>, res: Response) {
    // const userId = res.locals.user._id;

    const body = req.body;

    const trip = await createTrip({ ...body });

    return res.send(trip);
}

/** get all Trip */
export const getTrip = async (req: Request<ReadTripInput["params"]>, res: Response, next: NextFunction) => {
    const tripId = req.params?.tripId;
    try {
        const trip = await readTrip({ _id: tripId });
        if (!trip) {
            throw parentError(404, "Requested trip information was not found");
        }
        res.status(200).json(trip);
    } catch (error) {
        next(error);
    }
};

/** get Trip  */
export const getTrips = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const trips = await readallTrips({});
        if (!trips) {
            throw parentError(404, "No Trip Data was found");
        }
        res.status(200).json(trips);
    } catch (error) {
        next(error);
    }
};

/**  Update Trip */
export const updateTrip = async (req: Request<UpdateTripInput["params"]>, res: Response, next: NextFunction) => {
    try {
        const tripId = req.params?.tripId;
        const update = req.body;

        const trip = await readTrip({ _id: tripId });

        if (!trip) {
            throw parentError(404, "Requested trip information was not found");
        }

        const updatedTrip = await modifyTrip({ _id: tripId }, update, {
            new: true
        });

        return res.status(200).json(updatedTrip);
    } catch (error) {
        next(error);
    }
};

/** Delete Trip */
export const deleteTrip = async (req: Request<UpdateTripInput["params"]>, res: Response, next: NextFunction) => {
    const tripId = req.params.tripId;
    try {
        // const trip = await readTrip({ tripId });
        // if (!trip) {
        //     return parentError(404, "Requested account information was not found");
        // }

        await disableTrip({ _id: tripId });
        res.status(200).json("Trip successfully deleted");
    } catch (error) {
        next(error);
    }
};
