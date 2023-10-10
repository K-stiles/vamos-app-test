import { get } from "lodash";
import { FilterQuery, UpdateQuery } from "mongoose";

import SessionModel, { SessionDocument } from "../models/session.model";
import config from "../config/config";
import { findUser } from "./auth.service";
import { signJwt, verifyJwt } from "../functions/jwt.function";

export async function createSession(userId: string, userAgent: string) {
    const session = await SessionModel.create({ user: userId, userAgent });

    return session.toJSON();
}

export async function findSessions(query: FilterQuery<SessionDocument>) {
    return SessionModel.find(query).lean();
}

export async function updateSession(query: FilterQuery<SessionDocument>, update: UpdateQuery<SessionDocument>) {
    return SessionModel.updateOne(query, update);
}

interface REFRESH_TOKEN {
    refreshToken: string;
}

export async function reIssueAccessToken({ refreshToken }: REFRESH_TOKEN) {
    const { decoded } = verifyJwt(refreshToken, "serverRefreshTokenPublicKey");

    if (!decoded || !get(decoded, "session")) return false;

    const session = await SessionModel.findById(get(decoded, "session"));

    if (!session || !session.valid) return false;

    const user = await findUser({ _id: session.user });

    if (!user) return false;

    const accessToken = signJwt({ ...user, session: session._id }, "serverAccessTokenPrivateKey", { expiresIn: config.server.token.serverAccessTokenTTL });

    return accessToken;
}
