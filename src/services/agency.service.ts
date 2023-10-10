import { get } from "lodash";
import { FilterQuery, QueryOptions, UpdateQuery } from "mongoose";

import Agency, { AgencyDocument, AgencyInput } from "../models/agency.model";
import { parentError } from "../functions/error";

export async function createAgency(input: AgencyInput) {
    try {
        const result = await Agency.create(input);
        return result;
    } catch (error: any) {
        throw parentError(400, error);
    }
}

export async function readallAgencys(query: FilterQuery<AgencyDocument>, options: QueryOptions = { lean: true }) {
    try {
        const agencys = await Agency.find(query, {}, options);
        if (!agencys) return false;
        return agencys;
    } catch (error: any) {
        throw parentError(400, error);
    }
}

export async function readAgency(query: FilterQuery<AgencyDocument>) {
    try {
        const agency = await Agency.findById(query).lean();
        if (!agency) throw parentError(404, "Agency Data Not Found");
        return agency;
    } catch (error: any) {
        throw parentError(400, error);
    }
}

export async function modifyAgency(query: FilterQuery<AgencyDocument>, update: UpdateQuery<AgencyDocument>, options: QueryOptions) {
    try {
        const agency = await Agency.findByIdAndUpdate(query, update, options);
        if (!agency) throw parentError(404, "Agency Data Not Found");
        return agency;
    } catch (error: any) {
        throw parentError(400, error);
    }
}

export async function disableAgency(query: FilterQuery<AgencyDocument>) {
    try {
        return await Agency.findByIdAndDelete(query);
    } catch (error: any) {
        throw parentError(400, error);
    }
}
