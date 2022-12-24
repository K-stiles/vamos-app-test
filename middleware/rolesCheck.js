import { parentError } from "../utils/error.js";

export const rolesCheck = (...allowedRoles) => {
  return (req, res, next) => {
    if (!req?.user?.roles) {
      return next(
        parentError(401, "You are not authorized to access this resource")
      );
    }
    const requiredRoles = [...allowedRoles];
    const result = req.user.roles
      .map((role) => requiredRoles.includes(role))
      .find((val) => val === true);

    if (!result) {
      return next(
        parentError(401, "You are not authorized to access this resource")
      );
    }

    next();
  };
};
