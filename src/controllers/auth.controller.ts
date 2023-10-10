import { NextFunction, Request, Response } from "express";
import { omit } from "lodash";

import logger from "../library/logger";
import { createUser, loginUser, validatePassword, verifyAuth } from "../services/auth.service";
import { CreateUserInput, loginUserInput } from "../schema/auth.schema";
import { createSession, findSessions, updateSession } from "../services/session.service";
import { generateAccessToken } from "../functions/token.gen";

import { parentError } from "../functions/error";
import { signJwt } from "../functions/jwt.function";
import config from "../config/config";

const NAMESPACE = "User";

// send OTP
export async function register(req: Request<{}, {}, CreateUserInput["body"]>, res: Response, next: NextFunction) {
    try {
        const data: { message: string } = await createUser(req.body);

        // logger
        logger.info(NAMESPACE, data.message);

        return res.status(201).json(data);
    } catch (error: any) {
        logger.error(NAMESPACE, error.message, error);
        next(error);
    }
}

// verify user's OTP and save user to DB
export const authVerificathion = async (req: Request<{}, {}, CreateUserInput["body"]>, res: Response, next: NextFunction) => {
    try {
        const response = await verifyAuth(req.body);
        logger.info(NAMESPACE, response.message);
        return res.status(201).json(response);
    } catch (error: any) {
        logger.error(NAMESPACE, error.message, error);
        next(error);
    }
};

export const logout = async (req: Request, res: Response, next: NextFunction) => {
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

/**  LOGIN USER IN  */
export async function login(req: Request<{}, {}, loginUserInput["body"]>, res: Response, next: NextFunction) {
    try {
        // Validate the user's password and return the user
        const user = await validatePassword(req.body);

        if (!user) {
            throw parentError(401, "Invalid email or password");
        }

        /** create a session for the logged in user  */
        const session = await createSession(user._id, req.get("user-agent") || "");

        /** generate an access token for the logged in user */
        // TODO: GENERATE ACCESS TOKEN
        const accessToken = signJwt(
            { ...user, session: session._id },
            "serverAccessTokenPrivateKey",
            { expiresIn: config.server.token.serverAccessTokenTTL } // 15 minutes,
        );

        /**  generate a refresh token for the logged in user */
        // TODO: GENERATE REFRESH TOKEN
        const refreshToken = signJwt(
            { ...user, session: session._id },
            "serverRefreshTokenPrivateKey",
            { expiresIn: config.server.token.serverRefreshTokenTTL } // 15 minutes
        );

        logger.info(NAMESPACE, accessToken);
        // return access & refresh tokens
        return res.status(200).json({ user, accessToken, refreshToken });
    } catch (error: any) {
        logger.error(NAMESPACE, error.message, error);
        next(error);
    }
}

/** get current user's session */
export async function getUserSessionsHandler(req: Request, res: Response, next: NextFunction) {
    try {
        /** we get this [res.locals.user._id] from the res.locals.user object we attach to the res in the deserializeUser middleware*/
        const userId = res.locals.user._id;

        const sessions = await findSessions({ user: userId, valid: true });

        return res.status(200).json(sessions);
    } catch (error) {
        next(error);
    }
}

/** logout/delete current user's session */
export async function deleteSessionHandler(req: Request, res: Response, next: NextFunction) {
    try {
        const sessionId = res.locals.user.session;

        await updateSession({ _id: sessionId }, { valid: false });

        return res.send({ accessToken: null, refreshToken: null });
    } catch (error) {
        next(error);
    }
}

//Forgot Password
//Reset Password
