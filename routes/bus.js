import express from "express";
const router = express.Router();

import {
  createBus,
  deleteBus,
  getBus,
  getBuses,
  resetBusSeats,
  updateBus,
  updateBusFilledSeats,
} from "../controllers/busController.js";

router.get("/:id", getBus);
router.get("/", getBuses);
router.post("/", createBus);
router.put("/:id", updateBus);
router.put("/seatsfilled/:id", updateBusFilledSeats);
router.put("/resetbusseats/:id", resetBusSeats);
router.delete("/:id", deleteBus);

export default router;
