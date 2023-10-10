import { omit } from "lodash";

import Admin, { AdminInput, adminLoginBody } from "../models/admin.model";
import SubAdmin from "../models/subadmin.model";

import { parentError } from "../functions/error";
import { generateAccessToken } from "../functions/token.gen";

export async function verifyAdmin(input: AdminInput) {
    try {
        const _admin = await Admin.findOne({ email: input.email });
        if (_admin) throw parentError(409, "Admin already exists.");

        const admin = await Admin.create(input);

        return { succcess: true, message: "Admin successfully created", admin: omit(admin.toJSON(), "password") };
    } catch (e: any) {
        throw parentError(404, e);
    }
}

export async function validateAdminPassword(input: adminLoginBody) {
    const admin = await Admin.findOne({ email: input.email });
    const _subadmin = await SubAdmin.findOne({ email: input.email });

    if (admin) {
        const isValidAdmin = await admin.comparePassword(input.password);
        if (!isValidAdmin) throw parentError(400, "Invalid Username or Password");

        return omit(admin.toJSON(), "password");
    } else if (_subadmin) {
        const isValid_subadmin = await _subadmin.comparePassword(input.password);

        if (!isValid_subadmin) throw parentError(400, "Invalid Username or Password");

        return omit(_subadmin.toJSON(), "password");
    } else {
        throw parentError(404, "Account Data Not Found");
    }
}

/** SUB ADMIN STUFF */
export async function verifySubAdmin(input: AdminInput) {
    try {
        const dbuser = await SubAdmin.findOne({ email: input.email });
        if (dbuser) throw parentError(409, "Sub Admin already exists.");

        const user = await SubAdmin.create(input);

        return { succcess: true, message: "Sub Admin successfully created", sub_admin: omit(user.toJSON(), "password") };
    } catch (e: any) {
        throw parentError(404, e);
    }
}
