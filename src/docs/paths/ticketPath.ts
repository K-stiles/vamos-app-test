// Get a ticket for your trip
/**
 * @swagger
 * /api/v1/tickets/:
 *   post:
 *     summary: Add a ticket for a trip
 *     tags:
 *       - "Ticket"
 *     description: "Add a ticket"
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               id:
 *                 type: string
 *                 example: "6365043491f58b9b00a673b6"
 *               username:
 *                 type: string
 *                 example: "Jane Doe"
 *               price:
 *                 type: number
 *                 example: 100.00
 *               departureDateTime:
 *                 type: string
 *                 example: "15 August 2023, 1:20 pm"
 *               arrivalDateTime:
 *                 type: string
 *                 example: "18 August 2023, 10:20 am"
 *               contact:
 *                 type: array
 *                 items:
 *                   type: string
 *                 example: ["Jane Doe", "jdoe@example.com", "0244408990"]
 *     responses:
 *       201:
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               example:
 *                 message: "Ticket created successfully"
 *       400:
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               example:
 *                 err: "Invalid input data"
 */

// Get many tickets for your trip
/**
 * @swagger
 * /api/v1/tickets/many:
 *   post:
 *     summary: Add many tickets for a trip
 *     tags:
 *       - "Ticket"
 *     description: "Add a ticket"
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               id:
 *                 type: string
 *                 example: "6365043491f58b9b00a673b6"
 *               username:
 *                 type: string
 *                 example: "Jane Doe"
 *               price:
 *                 type: number
 *                 example: 100.00
 *               departureDateTime:
 *                 type: string
 *                 example: "15 August 2023, 1:20 pm"
 *               arrivalDateTime:
 *                 type: string
 *                 example: "18 August 2023, 10:20 am"
 *               contact:
 *                 type: array
 *                 items:
 *                   type: string
 *                 example: ["Jane Doe", "jdoe@example.com", "0244408990"]
 *     responses:
 *       201:
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               example:
 *                 message: "Ticket created successfully"
 *       400:
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               example:
 *                 err: "Invalid input data"
 */

// Get all tickets of your trips
/**
 * @swagger
 * /api/v1/tickets/:
 *   get:
 *     summary: Returns the list of multiple tickets of trips
 *     tags:
 *       - "Ticket"
 *     description: "Get information for multiple tickets"
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
 *                     example: "6365043491f58b9b00a673b6"
 *                   username:
 *                     type: string
 *                     example: "Jane Doe"
 *                   price:
 *                     type: number
 *                     example: 100.00
 *                   departureDateTime:
 *                     type: string
 *                     example: "15 August 2023, 1:20 pm"
 *                   arrivalDateTime:
 *                     type: string
 *                     example: "18 August 2023, 10:20 am"
 *                   contact:
 *                     type: array
 *                     items:
 *                       type: string
 *                     example: ["Jane Doe", "jdoe@example.com", "0244408990"]
 *       404:
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               example:
 *                 err: "No tickets found"
 */

// Get a single ticket
/**
 * @swagger
 * /api/v1/tickets/{ticketId}:
 *   get:
 *     summary: Returns a single ticket of a trip
 *     tags:
 *       - "Ticket"
 *     description: "Get information for a single ticket"
 *     parameters:
 *       - in: path
 *         name: ticketId
 *         required: true
 *         schema:
 *           type: string
 *         example: "6365043491f58b9b00a673b6"
 *     responses:
 *       200:
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                   example: "6365043491f58b9b00a673b6"
 *                 username:
 *                   type: string
 *                   example: "Jane Doe"
 *                 price:
 *                   type: number
 *                   example: 100.00
 *                 departureDateTime:
 *                   type: string
 *                   example: "15 August 2023, 1:20 pm"
 *                 arrivalDateTime:
 *                   type: string
 *                   example: "18 August 2023, 10:20 am"
 *                 contact:
 *                   type: array
 *                   items:
 *                     type: string
 *                   example: ["Jane Doe", "jdoe@example.com", "0244408990"]
 *       404:
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               example:
 *                 err: "Ticket not found"
 */

// Update a trip
/**
 * @swagger
 * /api/v1/tickets/{ticketId}:
 *   put:
 *     summary: Update a trip
 *     tags:
 *       - "Ticket"
 *     description: "Update information for a ticket"
 *     parameters:
 *       - in: path
 *         name: ticketId
 *         required: true
 *         schema:
 *           type: string
 *         example: "6365043491f58b9b00a673b6"
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - username
 *               - id
 *             properties:
 *               id:
 *                 type: string
 *                 example: "6365043491f58b9b00a673b6"
 *               username:
 *                 type: string
 *                 example: "Updated Name"
 *               price:
 *                 type: number
 *                 example: 120.00
 *               departureDateTime:
 *                 type: string
 *                 example: "15 August 2023, 3:00 pm"
 *               arrivalDateTime:
 *                 type: string
 *                 example: "18 August 2023, 12:00 pm"
 *               contact:
 *                 type: array
 *                 items:
 *                   type: string
 *                 example: ["Updated Name", "updated@example.com", "0244466888"]
 *     responses:
 *       200:
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               example:
 *                 message: "Ticket updated successfully"
 *       404:
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               example:
 *                 err: "Ticket not found"
 *       400:
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               example:
 *                 err: "Invalid input data"
 */

// Delete a trip
/**
 * @swagger
 * /api/v1/tickets/{ticketId}:
 *   delete:
 *     tags:
 *       - "Ticket"
 *     summary: "Delete a ticket"
 *     description: "Delete a ticket by ticket ID"
 *     parameters:
 *       - in: path
 *         name: ticketId
 *         required: true
 *         schema:
 *           type: string
 *         example: "6365043491f58b9b00a673b6"
 *     responses:
 *       200:
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               example:
 *                 message: "Ticket deleted successfully"
 *       404:
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               example:
 *                 err: "Ticket not found"
 */
