import express from "express";
const router = express.Router();

import { deleteAdmin, getAdmin, getAdmins, updateAdmin } from "../controllers/admin.controller";

router.get("/", getAdmins);
router.get("/:adminId", getAdmin);
router.put("/:adminId", updateAdmin);
router.delete("/:adminId", deleteAdmin);

export default router;
