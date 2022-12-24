import express from "express";
const router = express.Router();

import {
  register,
  loginAsAdmin,
  deleteAdmin,
  getAdmin,
  getAdmins,
  updateAdmin,
} from "../controllers/adminController.js";
import verifyAccessToken from "../middleware/verifyAccesToken.js";
import { rolesCheck } from "../middleware/rolesCheck.js";
import ROLES from "../utils/roles.js";

router.post("/auth-register", register);
router.post("/auth-login", loginAsAdmin);
router.get("/get-all", verifyAccessToken, rolesCheck(ROLES.ADMIN), getAdmins);
router.get("/:id", verifyAccessToken, rolesCheck(ROLES.ADMIN), getAdmin);
router.put("/:id", verifyAccessToken, rolesCheck(ROLES.ADMIN), updateAdmin);
router.delete("/:id", verifyAccessToken, rolesCheck(ROLES.ADMIN), deleteAdmin);

export default router;
