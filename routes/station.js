import express from "express";
const router = express.Router();

import {
  createStation,
  deleteStation,
  getStation,
  getStations,
  updateStation,
} from "../controllers/stationController.js";

router.get("/:id", getStation);
router.get("/", getStations);
router.post("/", createStation);
router.put("/:id", updateStation);
router.delete("/:id", deleteStation);

export default router;
