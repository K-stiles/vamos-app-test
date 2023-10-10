import dotenv from "dotenv";

dotenv.config();

const ENUM_USER: number = Number(process.env.ENUM_USER) || 0;
const ENUM_AGENCY: number = Number(process.env.ENUM_AGENCY) || 0;
const ENUM_SUB_ADMIN: number = Number(process.env.ENUM_SUB_ADMIN) || 0;
const ENUM_ADMIN: number = Number(process.env.ENUM_ADMIN) || 0;
const ENUM_CLIENTS: number[] = [ENUM_USER, ENUM_AGENCY, ENUM_SUB_ADMIN, ENUM_ADMIN]; // USER=2000 AGENCY=2500 SUB-ADMIN=4500 ADMIN=9500
const MONGO_USERNAME: string = process.env.MONGO_USERNAME || "??";
const MONGO_PASSWORD: string = process.env.MONGO_PASSWORD || "??";
const MONGO_DBNAME: string = process.env.MONGO_DBNAME || "??";
const MONGO_HOST: string = process.env.MONGO_HOST || "??";

const MONGO_OPTIONS = {
    // useUnifiedTopology: true,
    // useNewUrlParser: true,
    // socketTimeoutMS: 30000,
    // keepAlive: true,
    // poolSize: 50,
    // autoIndex: false,
    retryWrites: true
};

const MONGO = {
    host: MONGO_HOST,
    password: MONGO_PASSWORD,
    username: MONGO_USERNAME,
    options: MONGO_OPTIONS,
    ENUM_CLIENTS,
    url: `mongodb+srv://${MONGO_USERNAME}:${MONGO_PASSWORD}@${MONGO_HOST}`
};

const SERVER_HOSTNAME: string = process.env.SERVER_HOSTNAME || "??";
const SERVER_PORT: number = process.env.SERVER_PORT ? Number(process.env.SERVER_PORT) : 4000;
const SERVER_ACCESS_TOKEN_TTL: string = process.env.SERVER_ACCESS_TOKEN_TTL ? process.env.SERVER_ACCESS_TOKEN_TTL : "??";
const SERVER_REFRESH_TOKEN_TTL: string = process.env.SERVER_REFRESH_TOKEN_TTL ? process.env.SERVER_REFRESH_TOKEN_TTL : "??";
const SERVER_TOKEN_ISSUER: string = process.env.SERVER_TOKEN_ISSUER || "??";
const ACCESS_TOKEN_SECRETE: string = process.env.ACCESS_TOKEN_SECRETE || "??";
const SERVER_ACCESS_TOKEN_PRIVATE_KEY: string = process.env.SERVER_ACCESS_TOKEN_PRIVATE_KEY || "??";
const SERVER_ACCESS_TOKEN_PUBLIC_KEY: string = process.env.SERVER_ACCESS_TOKEN_PUBLIC_KEY || "??";
const SERVER_REFRESH_TOKEN_PRIVATE_KEY: string = process.env.SERVER_REFRESH_TOKEN_PRIVATE_KEY || "??";
const SERVER_REFRESH_TOKEN_PUBLIC_KEY: string = process.env.SERVER_REFRESH_TOKEN_PUBLIC_KEY || "??";
const SALT_WORK_FACTOR: number = Number(process.env.SALT_WORK_FACTOR);

const SERVER = {
    hostname: SERVER_HOSTNAME,
    port: SERVER_PORT,
    saltWorkFactor: SALT_WORK_FACTOR,
    token: {
        serverAccessTokenTTL: SERVER_ACCESS_TOKEN_TTL,
        serverRefreshTokenTTL: SERVER_REFRESH_TOKEN_TTL,
        issuer: SERVER_TOKEN_ISSUER,
        secret: ACCESS_TOKEN_SECRETE,
        serverAccessTokenPrivateKey: SERVER_ACCESS_TOKEN_PRIVATE_KEY,
        serverRefreshTokenPrivateKey: SERVER_REFRESH_TOKEN_PRIVATE_KEY,
        serverAccessTokenPublicKey: SERVER_ACCESS_TOKEN_PUBLIC_KEY,
        serverRefreshTokenPublicKey: SERVER_REFRESH_TOKEN_PUBLIC_KEY
    }
};

const config = { mongo: MONGO, server: SERVER };

export default config;
