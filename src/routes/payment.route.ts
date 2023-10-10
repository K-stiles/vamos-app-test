import express, { Router } from "express";
const router: Router = express.Router();

import { addPayment, deletePayment, getPayment, getPayments, updatePayment } from "../controllers/payment.controller";

router.get("/", getPayments);
router.post("/", addPayment);
router.get("/:paymentId", getPayment);
router.put("/:paymentId", updatePayment);
router.delete("/:paymentId", deletePayment);

export default router;
