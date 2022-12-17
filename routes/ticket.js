import express from "express";
const router = express.Router();

import {
  createTicket,
  deleteTicket,
  getTicket,
  getTickets,
  updateTicket,
  getAmount,
  getDestTickets,
  getDepartTickets
} from "../controllers/ticketController.js";

router.get("/:id", getTicket);
router.get("/", getTickets);
router.post("/", createTicket);
router.put("/:id", updateTicket);
router.delete("/:id", deleteTicket);
router.get('/:limit', getAmount);
router.get('/:destination', getDestTickets);
router.get('/:departure', getDepartTickets)


export default router;
