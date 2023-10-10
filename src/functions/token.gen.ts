import jwt from "jsonwebtoken";

import config from "../config/config";
import { UserDocument } from "models/user.model";

export function generateAccessToken(user: any) {
    const roles = [user.roles];
    return jwt.sign(
        {
            data: {
                id: user._id,
                phone: user.phone,
                roles
            }
        },
        config.server.token.secret,
        { expiresIn: "10m" }
    );
}
