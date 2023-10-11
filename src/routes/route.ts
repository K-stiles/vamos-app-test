import { Express, Request, Response, NextFunction } from "express";
import swaggerUI from "swagger-ui-express";

import authRoute from "./auth.route";
import { errorBuilder } from "../functions/error.builder";
import { apiRoute, notfound } from "./notfound";
import { specs } from "../docs/swagger";

import deserializeUser from "../middleware/deserialize_user";
import checkUser from "../middleware/cheack_user";
import adminRoute from "./admin.route";
import usersRoute from "./user.route";
import ticketRoute from "./ticket.route";
import agencyRoute from "./agency.route";
import paymentRoute from "./payment.route";
import tripsRoute from "./trip.route";
import sub_adminRoute from "./subadmin.route";

export default function routeHandlers(app: Express) {
    /** Server Home  */
    app.get("/", apiRoute);

    /** Server API Documentation */
    app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(specs));

    /** Health Check */
    app.get("/ping", (req: Request, res: Response, next: NextFunction) => {
        return res.status(200).json({ message: "pong" });
    });

    app.use("/api/v1/auth", authRoute);
    // app.use([checkUser, deserializeUser]);
    app.use("/api/v1/admin", adminRoute);
    app.use("/api/v1/admin-sub", sub_adminRoute);
    app.use("/api/v1/users", usersRoute);
    app.use("/api/v1/tickets", ticketRoute);
    app.use("/api/v1/trips", tripsRoute);
    app.use("/api/v1/agencies", agencyRoute);
    app.use("/api/v1/payments", paymentRoute);

    /** Server Error Builders */
    app.all("*", notfound);
    app.use(errorBuilder);
}
