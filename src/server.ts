import express, { Express, Request, Response, NextFunction } from "express";
import http from "http";
import cookieParser from "cookie-parser";
import mongoose from "mongoose";
import cors from "cors";
import helmet from "helmet";
import path, { dirname } from "node:path";
import { fileURLToPath } from "node:url";

import logger from "./library/logger";
import config from "./config/config";
import routeHandlers from "./routes/route";
import useListener from "./middleware/useListener";
import useHead from "./middleware/useHead";

const NAMESPACE = "Server";
const app: Express = express();
// const __dirname = dirname(fileURLToPath(import.meta.url));

/** Connect to MongoDB */
mongoose
    .connect(config.mongo.url, config.mongo.options)
    .then((result: any) => {
        logger.info(NAMESPACE, "🚀 Connected to DataBase");
    })
    .catch((error: { message: string }) => {
        logger.error(NAMESPACE, error.message, error);
        process.exit(1);
    });

/** routeware */
app.use(useListener(NAMESPACE));
app.use(cors());
app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
// app.use(express.static(path.join(__dirname, "/public")));
// app.set("view engine", "ejs");
// app.set("views", "web");
app.use(useHead);

/** Routes @routes/route */
routeHandlers(app);

const httpServer = http.createServer(app);
httpServer.listen(config.server.port, () => logger.info(NAMESPACE, `🚗💨 Server is running on http://${config.server.hostname}:${config.server.port}.`));
