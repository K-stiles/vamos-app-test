import express from "express";
const router = express.Router();

import {
  createTrip,
  deleteTrip,
  getTrip,
  getTrips,
  updateTrip,
} from "../controllers/tripController.js";

/**
 * @swagger
 * tags:
 *  name: Trips
 *  description: The trips managing API
 */

/**
 * @swagger
 * /api/trips:
 *  post:
 *    summary: Create a new trip
 *    tags: [Trips]
 *    requestBody:
 *      required: true
 *      content:
 *            application/json:
 *              schema:
 *                example:
 *                  destinationRegion: Greater Accra
 *                  arrivalRegion: Northern
 *                  destination: Accra
 *                  arrival: Tamale
 *                  departureDate: 8 Nov. 2022
 *                  arrivalDate: 8 Nov. 2022
 *                  departureTime: 7:00 am
 *                  arrivalTime: 8:00 pm
 *                  duration: 10 hr 41 min
 *                  distance: 613.2 km
 *    responses:
 *      200:
 *          description: The trip was successfully created
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/Trip'
 *      500:
 *        description: Error occurred
 */
router.post("/", createTrip);

/**
 * @swagger
 * /api/trips:
 *    get:
 *      summary: Returns the list of all the trips
 *      tags: [Trips]
 *      responses:
 *        200:
 *          description: The list of all the trips
 *          content:
 *            application/json:
 *              schema:
 *                type : array
 *                items:
 *                  $ref: '#/components/schemas/Trip'
 *        500:
 *          description: No Trip was found
 *        404:
 *          description: Error occurred
 */
router.get("/", getTrips);

/**
 * @swagger
 * /api/trips/{id}:
 *    get:
 *      summary: Get a trip by id
 *      tags: [Trips]
 *      parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The trip id
 *      responses:
 *        200:
 *          description: The trip details by id
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/Trip'
 *        500:
 *          description: Trip does not exist
 *        404:
 *          description: Error occurred
 */
router.get("/:id", getTrip);

/**
 * @swagger
 * /api/trips/{id}:
 *    put:
 *      summary: Update a trip
 *      tags: [Trips]
 *      parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The trip id
 *      requestBody:
 *        required: true
 *        content:
 *            application/json:
 *              schema:
 *                example:
 *                  destinationRegion: Greater Accra
 *                  arrivalRegion: Northern
 *                  destination: Accra
 *                  arrival: Tamale
 *                  departureDate: 8 Nov. 2022
 *                  arrivalDate: "8 Nov. 2022"
 *                  departureTime: 7:00 am
 *                  arrivalTime: 8:00 pm
 *                  duration: 10 hr 41 min
 *                  distance: 613.2 km
 *      responses:
 *        200:
 *          description: Successfully updated the trip
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/Trip'
 *        404:
 *          description: Error occurred
 */
router.put("/:id", updateTrip);

/**
 * @swagger
 * /api/trips/{id}:
 *    delete:
 *      summary: Delete a trip
 *      tags: [Trips]
 *      parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The trip id
 *      responses:
 *        200:
 *          description: Trip successfully deleted
 *        404:
 *          description: Error occurred
 */
router.delete("/:id", deleteTrip);

export default router;
