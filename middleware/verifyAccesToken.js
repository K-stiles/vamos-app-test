import jwt from "jsonwebtoken";
import { parentError } from "../utils/error.js";

function verifyAccessToken(req, res, next) {
  const authHeader = req.headers.Authorization || req.headers.authorization;
  if (!authHeader?.startsWith("Bearer "))
    return next(parentError(403, "Forbiden! please authenticate."));

  const token = authHeader.split("Bearer ")[1];
  if (!token)
    return next(parentError(401, "Unauthorized! You are not authenticated."));

  try {
    jwt.verify(
      token,
      process.env.ACCESS_TOKEN_SECRETE,
      function (err, decoded) {
        if (err) return next(parentError(400, "Invalid/Eexpired Token"));
        // decoded undefined
        req.user = decoded.username;
        next();
      }
    );
  } catch (error) {
    next(error);
  }
}

export default verifyAccessToken;
