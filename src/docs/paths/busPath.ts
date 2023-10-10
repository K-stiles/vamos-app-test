// Create a Bus
/**
 * @swagger
 * /api/bus/:
 *   post:
 *     tags:
 *       - "Bus"
 *     summary: "Create a bus"
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - regNumber
 *               - name
 *             properties:
 *               id:
 *                 type: string
 *                 example: "6365293491f78b9b00a673b6"
 *               regNumber:
 *                 type: string
 *                 example: "GR-2637-23"
 *               name:
 *                 type: string
 *                 example: "OheneBa"
 *     responses:
 *       201:
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               example:
 *                 message: "Bus created successfully"
 *       400:
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               example:
 *                 err: "Invalid input"
 *       409:
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               example:
 *                 err: "Bus already exists"
 */

// Get all buses
/**
 * @swagger
 * /api/bus/:
 *   get:
 *     tags:
 *       - "Bus"
 *     summary: "Get all buses"
 *     responses:
 *       200:
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: string
 *                     example: "6365293491f78b9b00a673b6"
 *                   regNumber:
 *                     type: string
 *                     example: "GR-2637-23"
 *                   name:
 *                     type: string
 *                     example: "OheneBa"
 *       401:
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               example:
 *                 err: "Unauthorized"
 */

// Get buses by id
/**
 * @swagger
 * /api/bus/{id}:
 *   get:
 *     tags:
 *       - "Bus"
 *     summary: "Get a bus by ID"
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         example: "6365293491f78b9b00a673b6"
 *     responses:
 *       200:
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                   example: "6365293491f78b9b00a673b6"
 *                 regNumber:
 *                   type: string
 *                   example: "GR-2637-23"
 *                 name:
 *                   type: string
 *                   example: "OheneBa"
 *       401:
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               example:
 *                 err: "Unauthorized"
 *       404:
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               example:
 *                 err: "Bus not found"
 */

// Update a bus
/**
 * @swagger
 * /api/bus/{id}:
 *   put:
 *     tags:
 *       - "Bus"
 *     summary: "Update a bus by ID"
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         example: "6365293491f78b9b00a673b6"
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               regNumber:
 *                 type: string
 *                 example: "GR-2637-24"
 *               name:
 *                 type: string
 *                 example: "NewBusName"
 *     responses:
 *       200:
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               example:
 *                 message: "Bus updated successfully"
 *       401:
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               example:
 *                 err: "Unauthorized"
 *       404:
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               example:
 *                 err: "Bus not found"
 *       409:
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               example:
 *                 err: "Bus already exists"
 */

// Update a seat filled
/**
 * @swagger
 * /api/bus/seatsfilled/{id}:
 *   put:
 *     tags:
 *       - "Bus"
 *     summary: "Update filled seats of a bus by ID"
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         example: "6365293491f78b9b00a673b6"
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               filledSeats:
 *                 type: integer
 *                 example: 25
 *     responses:
 *       200:
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               example:
 *                 message: "Filled seats of the bus updated successfully"
 *       401:
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               example:
 *                 err: "Unauthorized"
 *       404:
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               example:
 *                 err: "Bus not found"
 *       400:
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               example:
 *                 err: "Invalid input"
 */

// Reset Bus seats
/**
 * @swagger
 * /api/bus/resetbusseats/{id}:
 *   put:
 *     tags:
 *       - "Bus"
 *     summary: "Reset seats of a bus by ID"
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         example: "6365293491f78b9b00a673b6"
 *     responses:
 *       200:
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               example:
 *                 message: "Seats of the bus reset successfully"
 *       401:
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               example:
 *                 err: "Unauthorized"
 *       404:
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               example:
 *                 err: "Bus not found"
 */

// Delete a bus
/**
 * @swagger
 * /api/bus/{id}:
 *   delete:
 *     tags:
 *       - "Bus"
 *     summary: "Delete a bus by ID"
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         example: "6365293491f78b9b00a673b6"
 *     responses:
 *       200:
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               example:
 *                 message: "Bus deleted successfully"
 *       401:
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               example:
 *                 err: "Unauthorized"
 *       404:
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               example:
 *                 err: "Bus not found"
 */
