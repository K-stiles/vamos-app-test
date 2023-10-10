import { NextFunction, Request, Response } from "express";

import { createSession } from "../services/session.service";

import { parentError } from "../functions/error";
import { signJwt } from "../functions/jwt.function";
import config from "../config/config";
import { CreateAdminInput, loginAdminInput } from "../schema/adminAuth.schema";
import { validateAdminPassword, verifyAdmin, verifySubAdmin } from "../services/adminAuth.service";

const NAMESPACE = "Admin";

/** REGISTER ADMIN */
export async function admin_register(req: Request<{}, {}, CreateAdminInput["body"]>, res: Response, next: NextFunction) {
    try {
        const response = await verifyAdmin(req.body);
        return res.status(201).json(response);
    } catch (error) {
        next(error);
    }
}

/**  LOGIN FOR SUPER ADMIN AND SUB-ADMIN  */
export async function admin_login(req: Request<{}, {}, loginAdminInput["body"]>, res: Response, next: NextFunction) {
    try {
        // Validate the admin's password and return the admin
        const admin = await validateAdminPassword(req.body);
        if (!admin) {
            throw parentError(401, "Invalid email or password");
        }

        // const _subadmin = await validateSubAdminPassword(req.body);
        // if (!_subadmin) {
        //     throw parentError(401, "Invalid email or password");
        // }

        /** create a session for the logged in admin  */
        // const client = admin || _subadmin;
        const session = await createSession(admin._id, req.get("user-agent") || "");

        /** generate an access token for the logged in admin */
        // TODO: GENERATE ACCESS TOKEN
        const accessToken = signJwt(
            { ...admin, session: session._id },
            "serverAccessTokenPrivateKey",
            { expiresIn: config.server.token.serverAccessTokenTTL } // 15 minutes,
        );

        /**  generate a refresh token for the logged in admin */
        // TODO: GENERATE REFRESH TOKEN
        const refreshToken = signJwt(
            { ...admin, session: session._id },
            "serverRefreshTokenPrivateKey",
            { expiresIn: config.server.token.serverRefreshTokenTTL } // 15 minutes
        );

        // return access & refresh tokens
        return res.status(200).json({ admin, accessToken, refreshToken });
    } catch (error) {
        next(error);
    }
}

/** LOGOUT ADMIN */
export const admin_logout = async (req: Request, res: Response, next: NextFunction) => {
    try {
        // On client, also delete the accessToken

        //     const cookies = req.cookies;
        //     if (!cookies?.vamos) return res.status(204).json("No content");
        //     const refreshToken = cookies.vamos;

        //     const user = await User.findOne({ refreshToken }).exec();
        //     if (!user) {
        //         res.clearCookie("vamos", {
        //             httpOnly: true,
        //             secure: true,
        //             sameSite: "None"
        //         });
        //         return res.status(204).json("No content");
        //     }

        //     user.refreshToken = "";
        //     await user.save();

        //     res.clearCookie("vamos", {
        //         httpOnly: true,
        //         secure: true,
        //         sameSite: "None"
        //     });
        res.status(200).json({ message: "Logout was successful" });
    } catch (error) {
        next(error);
    }
};

//Forgot Password
//Reset Password

/** ADD SUB-ADMIN */
export async function sub_admin_register(req: Request<{}, {}, CreateAdminInput["body"]>, res: Response, next: NextFunction) {
    try {
        const response = await verifySubAdmin(req.body);
        return res.status(201).json(response);
    } catch (error) {
        next(error);
    }
}
