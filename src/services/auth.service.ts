import { FilterQuery } from "mongoose";
import { omit } from "lodash";
import bcrypt from "bcryptjs";

import User, { UserDocument, UserInput, loginBody } from "../models/user.model";

import { parentError } from "../functions/error";
import { generateAccessToken } from "../functions/token.gen";

export async function createUser(input: UserInput) {
    try {
        const user = await User.findOne({ phone: input.phone }).exec();
        if (user) throw parentError(409, "User already exists.");

        // send OTP TO USER'S PHONE
        // BEFORE RETURNING THE ,ESSAGE

        return { message: "A verification OTP has been sent to your phone/SMS" };
    } catch (e: any) {
        throw new Error(e);
    }
}

export async function verifyAuth(input: UserInput) {
    // verify OTP here before saving the user
    try {
        const dbuser = await User.findOne({ phone: input.phone });
        if (dbuser) throw parentError(409, "User already exists.");

        const user = await User.create(input);

        return { succcess: true, message: "User successfully created", user: omit(user.toJSON(), "password") };
    } catch (e: any) {
        throw parentError(404, e);
    }
}

export async function loginUser(input: loginBody) {
    try {
        const user = await User.findOne({ phone: input.phone }).exec();
        if (!user) throw parentError(409, "User not found");

        const match = bcrypt.compareSync(input.password, user.password);
        if (!match) throw parentError(400, "Invalid Username or Password");
        const access_token = generateAccessToken(user);

        return { user: omit(user.toJSON(), "password"), access_token };
    } catch (e: any) {
        throw new Error(e);
    }
}

export async function validatePassword(input: loginBody) {
    const user = await User.findOne({ phone: input.phone });

    if (!user) {
        return false;
    }

    const isValid = await user.comparePassword(input.password);

    if (!isValid) return false;

    return omit(user.toJSON(), "password");
}

/** used in reIssueAccessToken to find the user  */
export async function findUser(query: FilterQuery<UserDocument>) {
    return User.findOne(query).lean();
}
