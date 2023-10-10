import { get } from "lodash";
import { FilterQuery, QueryOptions, UpdateQuery } from "mongoose";

import Trip, { TripDocument, TripInput } from "../models/trip.model";
import { parentError } from "../functions/error";

export async function createTrip(input: TripInput) {
    try {
        const result = await Trip.create(input);
        return result;
    } catch (error: any) {
        throw parentError(400, error);
    }
}

export async function readallTrips(query: FilterQuery<TripDocument>, options: QueryOptions = { lean: true }) {
    try {
        const trips = await Trip.find(query, {}, options);
        if (!trips) return false;
        return trips;
    } catch (error: any) {
        throw parentError(400, error);
    }
}

export async function readTrip(query: FilterQuery<TripDocument>) {
    try {
        const trip = await Trip.findById(query).lean();
        if (!trip) throw parentError(404, "Trip Data Not Found");
        return trip;
    } catch (error: any) {
        throw parentError(400, error);
    }
}

export async function modifyTrip(query: FilterQuery<TripDocument>, update: UpdateQuery<TripDocument>, options: QueryOptions) {
    try {
        const trip = await Trip.findByIdAndUpdate(query, update, options);
        if (!trip) throw parentError(404, "Trip Data Not Found");
        return trip;
    } catch (error: any) {
        throw parentError(400, error);
    }
}

export async function disableTrip(query: FilterQuery<TripDocument>) {
    try {
        return await Trip.findByIdAndDelete(query);
    } catch (error: any) {
        throw parentError(400, error);
    }
}
