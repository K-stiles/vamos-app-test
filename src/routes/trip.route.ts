import express, { Router } from "express";
const router: Router = express.Router();

import { addTrip, deleteTrip, getTrip, getTrips, updateTrip } from "../controllers/trip.controller";

router.get("/", getTrips);
router.post("/", addTrip);
router.get("/:tripId", getTrip);
router.put("/:tripId", updateTrip);
router.delete("/:tripId", deleteTrip);

export default router;
