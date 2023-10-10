import express, { Router } from "express";
const router: Router = express.Router();

import { addTicket, addTickets, deleteTicket, getTicket, getTickets, updateTicket } from "../controllers/ticket.controller";

router.get("/", getTickets);
router.post("/", addTicket);
router.post("/many", addTickets);
router.get("/:ticketId", getTicket);
router.put("/:ticketId", updateTicket);
router.delete("/:ticketId", deleteTicket);

export default router;
