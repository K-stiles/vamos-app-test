import express, { Router } from "express";
const router: Router = express.Router();

import { addAgency, deleteAgency, getAgency, getAgencys, updateAgency } from "../controllers/agency.controller";

router.get("/", getAgencys);
router.post("/", addAgency);
router.get("/:agencyId", getAgency);
router.put("/:agencyId", updateAgency);
router.delete("/:agencyId", deleteAgency);

export default router;
