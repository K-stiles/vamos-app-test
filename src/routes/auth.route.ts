import express from "express";

import { register, authVerificathion, logout, login } from "../controllers/auth.controller";
import { createUserSchema, loginUserSchema } from "../schema/auth.schema";
import resourceValidator from "../middleware/validate.resource";
import { admin_login, admin_register, admin_logout, sub_admin_register } from "../controllers/adminAuth.controller";
import { createAdminSchema, loginAdminSchema } from "../schema/adminAuth.schema";

const router = express.Router();

/** user authentication */
router.post("/register", resourceValidator(createUserSchema), register);
router.post("/otpverification", resourceValidator(createUserSchema), authVerificathion);
router.post("/login", resourceValidator(loginUserSchema), login);
router.get("/logout", logout);

/** Password Management  Route */
// router.get("/resetPassword", resetPassword);
// router.get("/forgotPassword", forgotPassword);

/** admin/subAdmin authentication */
router.post("/admin/register", resourceValidator(createAdminSchema), admin_register);
router.post("/admin/register-sub", resourceValidator(createAdminSchema), sub_admin_register);
router.post("/admin/login", resourceValidator(loginAdminSchema), admin_login);
router.get("/admin/logout", admin_logout);

/** Password Management  Route */
// router.get("/resetPassword", resetPassword);
// router.get("/forgotPassword", forgotPassword);

export default router;
