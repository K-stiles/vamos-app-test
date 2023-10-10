import config from "../config/config";
import jwt from "jsonwebtoken";

export function signJwt(object: Object, keyName: "serverAccessTokenPrivateKey" | "serverRefreshTokenPrivateKey", options?: jwt.SignOptions | undefined) {
    const _privateSigningKey = config.server.token[keyName];

    return jwt.sign(object, _privateSigningKey, {
        ...(options && options),
        algorithm: "RS256"
    });
}

export function verifyJwt(token: string, keyName: "serverAccessTokenPublicKey" | "serverRefreshTokenPublicKey") {
    const publicKey = Buffer.from(config.server.token[keyName], "base64").toString("ascii");

    try {
        // IF JWT VERIFICATION WITH THE PUBLIC KEY PASSESS, DECODE IT
        const decoded = jwt.verify(token, publicKey);
        // IF PASSED SEND AN OBJEDCT WITH A VALID,  EXPIRED AND THE DECODED TOKEN
        return {
            valid: true,
            expired: false,
            decoded
        };
    } catch (e: any) {
        // LOG THE ERROR
        console.error(e);
        // RETURN EXPIRED TOKEN
        return {
            valid: false,
            expired: e.message === "jwt expired",
            decoded: null
        };
    }
}
