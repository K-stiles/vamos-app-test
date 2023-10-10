import { get } from "lodash";
import { FilterQuery, QueryOptions, UpdateQuery } from "mongoose";

import User, { UserDocument } from "../models/user.model";
import { parentError } from "../functions/error";

export async function readallUsers(query: FilterQuery<UserDocument>, options: QueryOptions = { lean: true }) {
    try {
        const users = await User.find(query, {}, options);
        if (!users) return false;
        return users;
    } catch (error: any) {
        throw parentError(400, error);
    }
}

export async function readUser(query: FilterQuery<UserDocument>) {
    try {
        const user = await User.findById(query).lean();
        if (!user) throw parentError(404, "Account Data Not Found");
        return user;
    } catch (error: any) {
        throw parentError(400, error);
    }
}

export async function modifyUser(query: FilterQuery<UserDocument>, update: UpdateQuery<UserDocument>, options: QueryOptions) {
    try {
        return await User.findByIdAndUpdate(query, update, options);
    } catch (error: any) {
        throw parentError(400, error);
    }
}

export async function disableUser(query: FilterQuery<UserDocument>) {
    try {
        return await User.findByIdAndDelete(query);
    } catch (error: any) {
        throw parentError(400, error);
    }
}
