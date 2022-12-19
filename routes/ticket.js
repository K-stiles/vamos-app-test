import express from "express";
import {
  createTicket,
  deleteTicket,
  getTicket,
  getTickets,
  updateTicket,
  getAmount,
  getDestTickets,
  getDepartTickets,
} from "../controllers/ticketController.js";
import ROLES from "../utils/roles.js";
import { rolesCheck } from "../middleware/rolesCheck.js";

const router = express.Router();

router.get("/:ticketId", getTicket);
router.get("/", getTickets);
router.post("/", rolesCheck(ROLES.ADMIN), createTicket);
router.put("/:ticketId", rolesCheck(ROLES.ADMIN), updateTicket);
router.delete("/:ticketId", rolesCheck(ROLES.ADMIN), deleteTicket);

// router.get("/:limit", getAmount); //TODO: please Eleborate
// router.get("/:destination", getDestTickets); //TODO: please Eleborate
// router.get("/:departure", getDepartTickets); //TODO: please Eleborate

//TODO: GET Ticket
//TODO: GET Tickets -10 at a time,sort with [date||agency||price||destination||pickupLocation]
//TODO: CREATE Ticket
//TODO: UPDATE Ticket
//TODO: DELETE Ticket

export default router;
