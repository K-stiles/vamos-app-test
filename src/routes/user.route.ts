import express, { Router } from "express";
const router: Router = express.Router();

import { deleteUser, getUser, getUsers, updateUser } from "../controllers/user.controller";

router.get("/", getUsers);
router.get("/:userId", getUser);
router.put("/:userId", updateUser);
router.delete("/:userId", deleteUser);

export default router;
