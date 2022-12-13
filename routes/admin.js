import express from "express";
const router = express.Router();

import {
  createAdmin,
  deleteAdmin,
  getAdmin,
  getAdmins,
  updateAdmin,
} from "../controllers/adminController.js";

router.get("/:id", getAdmin);
router.get("/", getAdmins);
router.post("/", createAdmin);
router.put("/:id", updateAdmin);
router.delete("/:id", deleteAdmin);

export default router;
