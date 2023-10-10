import express from "express";
const router = express.Router();

import { deleteSubAdmin, getSubAdmin, getSubAdmins, updateSubAdmin } from "../controllers/subAdmin.controller";

router.get("/", getSubAdmins);
router.get("/:subAdminId", getSubAdmin);
router.put("/:subAdminId", updateSubAdmin);
router.delete("/:subAdminId", deleteSubAdmin);

export default router;
