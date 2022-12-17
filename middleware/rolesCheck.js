import { parentError } from "../utils/error.js";

export const rolesCheck = (...allowedRoles) => {
  return (req, res, next) => {
    if (!req?.roles)
      return next(
        parentError(401, "You are not authorized to access this resource")
      );
    const rolesArray = [...allowedRoles];

    console.log("allowed SERVER-DB Roles:... ", rolesArray);
    console.log("In comming roles from Client:... ", req.roles);

    const result = req.roles
      .map((role) => rolesArray.includes(role))
      .find((val) => val === true);

    if (!result)
      return next(
        parentError(401, "You are not authorized to access this resource")
      );

    next();
  };
};
