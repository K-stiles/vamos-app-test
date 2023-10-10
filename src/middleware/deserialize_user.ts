/** middleware */

import { get } from "lodash";
import { Request, Response, NextFunction } from "express";
import { verifyJwt } from "../functions/jwt.function";
import { reIssueAccessToken } from "../services/session.service";

const deserializeUser = async (req: Request, res: Response, next: NextFunction) => {
    const accessToken = get(req, "headers.authorization", "").replace(/^Bearer\s/, "");

    const refreshToken = get(req, "headers.x-refresh");

    if (!accessToken) {
        return next();
    }

    const { decoded, expired } = verifyJwt(accessToken, "serverAccessTokenPublicKey");

    if (decoded) {
        res.locals.user = decoded;
        return next();
    }

    // TODO: GENERATE A NEW ACCESS TOKEN TO USER
    // if (expired && refreshToken) {
    //     const newAccessToken = await reIssueAccessToken({ refreshToken });

    //     if (newAccessToken) {
    //         res.setHeader("x-access-token", newAccessToken);
    //     }

    //     const result = verifyJwt(newAccessToken as string, "serverAccessTokenPublicKey");

    //     res.locals.user = result.decoded;
    //     return next();
    // }

    return next();
};

export default deserializeUser;
