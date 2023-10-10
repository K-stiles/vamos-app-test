import { get } from "lodash";
import { FilterQuery, QueryOptions, UpdateQuery } from "mongoose";

import SubAdmin, { SubAdminDocument } from "../models/subadmin.model";
import { parentError } from "../functions/error";

export async function readallSubAdmins(query: FilterQuery<SubAdminDocument>, options: QueryOptions = { lean: true }) {
    try {
        const subAdmins = await SubAdmin.find(query, {}, options);
        if (!subAdmins) return false;
        return subAdmins;
    } catch (error: any) {
        throw parentError(400, error);
    }
}

export async function readSubAdmin(query: FilterQuery<SubAdminDocument>) {
    try {
        const subAdmin = await SubAdmin.findById(query).lean();
        if (!subAdmin) throw parentError(404, "Account Data Not Found");
        return subAdmin;
    } catch (error: any) {
        throw parentError(400, error);
    }
}

export async function modifySubAdmin(query: FilterQuery<SubAdminDocument>, update: UpdateQuery<SubAdminDocument>, options: QueryOptions) {
    try {
        return await SubAdmin.findByIdAndUpdate(query, update, options);
    } catch (error: any) {
        throw parentError(400, error);
    }
}

export async function disableSubAdmin(query: FilterQuery<SubAdminDocument>) {
    try {
        return await SubAdmin.findByIdAndDelete(query);
    } catch (error: any) {
        throw parentError(400, error);
    }
}
