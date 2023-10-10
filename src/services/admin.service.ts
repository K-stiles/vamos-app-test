import { get } from "lodash";
import { FilterQuery, QueryOptions, UpdateQuery } from "mongoose";

import Admin, { AdminDocument } from "../models/admin.model";
import { parentError } from "../functions/error";

export async function readallAdmins(query: FilterQuery<AdminDocument>, options: QueryOptions = { lean: true }) {
    try {
        const admins = await Admin.find(query, {}, options);
        if (!admins) return false;
        return admins;
    } catch (error: any) {
        throw parentError(400, error);
    }
}

export async function readAdmin(query: FilterQuery<AdminDocument>) {
    try {
        const admin = await Admin.findById(query).lean();
        if (!admin) throw parentError(404, "Account Data Not Found");
        return admin;
    } catch (error: any) {
        throw parentError(400, error);
    }
}

export async function modifyAdmin(query: FilterQuery<AdminDocument>, update: UpdateQuery<AdminDocument>, options: QueryOptions) {
    try {
        return await Admin.findByIdAndUpdate(query, update, options);
    } catch (error: any) {
        throw parentError(400, error);
    }
}

export async function disableAdmin(query: FilterQuery<AdminDocument>) {
    try {
        return await Admin.findByIdAndDelete(query);
    } catch (error: any) {
        throw parentError(400, error);
    }
}
