/**
 * @swagger
 * tags:
 *  name: Agency
 *  description: The agencies managing API
 */

/**
 * @swagger
 * /api/v1/agencies:
 *    get:
 *      summary: Returns the list of all the agencies
 *      tags: [Agency]
 *      responses:
 *        200:
 *          description: The list of all the agencies
 *          content:
 *            application/json:
 *              schema:
 *                type : array
 *                items:
 *                  $ref: '#/components/schemas/agency'
 *        500:
 *          description: No agency was found
 *        404:
 *          description: Error occurred
 */

/**
 * @swagger
 * /api/v1/agencies/{id}:
 *   get:
 *     summary: Get a agency by id
 *     tags: [Agency]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The agency id
 *     responses:
 *      200:
 *          description: The agency details by id
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/agency'
 *      500:
 *        description: agency does not exist
 *      404:
 *        description: Error ocurred
 *
 *
 *
 */

/**
 * @swagger
 * /api/v1/agencies/{id}:
 *   put:
 *     summary: Update an agency
 *     tags: [Agency]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The agency id
 *     requestBody:
 *      required: true
 *      content:
 *            application/json:
 *              schema:
 *                example:
 *                  agencyname: Abednego
 *                  phone: "0247157301"
 *     responses:
 *      200:
 *          description: Successfully updated the agency
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/agency'
 *      404:
 *        description: Error ocurred
 */

/**
 * @swagger
 * /api/v1/agencies/{id}:
 *   delete:
 *     summary: Delete an agency
 *     tags: [Agency]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The agency id
 *     responses:
 *      200:
 *          description: agency account has been successfully deleted
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/agency'
 *      404:
 *        description: Error ocurred
 *
 */
