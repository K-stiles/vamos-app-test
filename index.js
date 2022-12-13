import express from "express";
import * as dotenv from "dotenv";
import cors from "cors";
import helmet from "helmet";
import cookieParser from "cookie-parser";
import mongoose from "mongoose";
import swaggerUI from "swagger-ui-express";
import swaggerJSDoc from "swagger-jsdoc";

//middlewares
import { errorBuilder } from "./middleware/errorBuilder.js";
// import verifyAccessToken from "./middleware/verifyAccesToken.js";
// import { rolesCheck } from "./middleware/rolesCheck.js";
import credentials from "./middleware/credentials.js";
import corsOptions from "./utils/corsOptions.js";

//routes
import authRoute from "./routes/auth.js";
import userRoute from "./routes/user.js";
import adminRoute from "./routes/admin.js";
import refreshTokenRoute from "./routes/refreshToken.js";

import { User, Trip } from "./routes/docs/schemas.js";

//TODO: @Abednego please move this to a separate file
const swaggerOptions = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Vamos App API Documentation",
      version: "1.0.0",
      description:
        "A CRUD API for for demonstrating how Users may book seats in our Buses",
    },
    servers: [
      {
        url: "http://localhost:3000",
        description: "Local Server",
      },
      {
        url: "https://frightened-bee-vestments.cyclic.app/",
        description: "Development Server",
      },
    ],
    components: {
      schemas: {
        User,
        Trip,
      },
    },
  },
  apis: ["./routes/*.js"],
};

const app = express();
dotenv.config();

const specs = swaggerJSDoc(swaggerOptions);

const PORT = process.env.PORT || 4000;

//middlewares
app.use(credentials);
app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(helmet());
app.use(cookieParser());

app.get("/", (req, res) => {
  res.send(
    `<h1 style="text-align:center;padding-top:100px">Welcome to Vamos-App Api </h1>`
  );
});

app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(specs));
app.use("/api/auth", authRoute);
app.use("/api/refresh-token", refreshTokenRoute);
app.use("/api/users", userRoute);
app.use("/api/admin-auth", adminRoute);
app.all("*", (req, res) => {
  res
    .status(404)
    .send(
      `<h1 style="text-align:center;padding-top:100px">Page Not Found </h1>`
    );
});
app.use(errorBuilder);

// async function dbConnection() {
// try {
mongoose.connect(process.env.DB_URL).then(
  () => {
    console.log("Successfully connected to DB");
    app.listen(PORT, () => {
      console.log(`🚀 Server ready at http://localhost:${PORT}`);
    });
  },
  (error) => {
    /** handle initial connection error */
    throw error;
  }
);
// } catch (error) {
//   throw error;
// }
// }

// dbConnection();
mongoose.connection.on("disconnected", () => {
  console.log("MongoDB is disconnected");
});
