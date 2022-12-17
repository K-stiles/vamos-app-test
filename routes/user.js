import express from "express";
const router = express.Router();

import {
  deleteUser,
  getUser,
  getUsers,
  updateUser,
} from "../controllers/userController.js";
import ROLES from "../utils/roles.js";
import { rolesCheck } from "../middleware/rolesCheck.js";

/**
 * @swagger
 * tags:
 *  name: Users
 *  description: The users managing API
 */

/**
 * @swagger
 * /api/users:
 *    get:
 *      summary: Returns the list of all the users
 *      tags: [Users]
 *      responses:
 *        200:
 *          description: The list of all the users
 *          content:
 *            application/json:
 *              schema:
 *                type : array
 *                items:
 *                  $ref: '#/components/schemas/User'
 *        500:
 *          description: No user was found
 *        404:
 *          description: Error occurred
 */

/**
 * @swagger
 * /api/users/{id}:
 *   get:
 *     summary: Get a user by id
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The user id
 *     responses:
 *      200:
 *          description: The user details by id
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/User'
 *      500:
 *        description: User does not exist
 *      404:
 *        description: Error ocurred
 *
 *
 *
 */

/**
 * @swagger
 * /api/users/{id}:
 *   put:
 *     summary: Update a User
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The user id
 *     requestBody:
 *      required: true
 *      content:
 *            application/json:
 *              schema:
 *                example:
 *                  username: Abednego
 *                  phone: "0247157301"
 *     responses:
 *      200:
 *          description: Successfully updated the user
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/User'
 *      404:
 *        description: Error ocurred
 */

/**
 * @swagger
 * /api/users/{id}:
 *   delete:
 *     summary: Delete a User
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The user id
 *     responses:
 *      200:
 *          description: User account has been successfully deleted
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/User'
 *      404:
 *        description: Error ocurred
 *
 */

router.get("/", rolesCheck(ROLES.ADMIN), getUsers);
router.get("/:id", rolesCheck(ROLES.USER, ROLES.ADMIN), getUser);
router.put("/:id", rolesCheck(ROLES.USER, ROLES.ADMIN), updateUser);
router.delete("/:id", rolesCheck(ROLES.USER, ROLES.ADMIN), deleteUser);

export default router;
