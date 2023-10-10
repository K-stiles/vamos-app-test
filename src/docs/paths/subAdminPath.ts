// Register as SubAdmin
/**
 * @swagger
 * /api/admin/register-sub:
 *   post:
 *     tags:
 *       - "Authentication"
 *     summary: "Create a subAdmin account"
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - username
 *               - email
 *               - phone
 *               - password
 *             properties:
 *               username:
 *                 type: string
 *                 example: "SubAdmin123"
 *               email:
 *                 type: string
 *                 example: "SubAdmin@example.com"
 *               phone:
 *                 type: string
 *                 example: "123-456-7890"
 *               password:
 *                 type: string
 *                 example: "password1234"
 *               id:
 *                 type: string
 *                 example: "1"
 *               profile:
 *                 type: string
 *                 example: "https://example.com/SubAdmin-profile.jpg"
 *               roles:
 *                 type: integer
 *                 example: 1
 *     responses:
 *       201:
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               example:
 *                 message: "SubAdmin account created successfully"
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
 *                 err: "SubAdmin account already exists"
 */

// Login as SubAdmin
/**
 * @swagger
 * /api/admin-sub/login:
 *   post:
 *     tags:
 *       - "Authentication"
 *     summary: "Login as a SubAdmin"
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *                 example: "SubAdmin@example.com"
 *               password:
 *                 type: string
 *                 example: "password1234"
 *     responses:
 *       200:
 *         headers:
 *           Set-cookie:
 *             schema:
 *               type: object
 *             description: "contains verifiedEmail verifiedMember id role email in object of name data"
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               example:
 *                 data:
 *                   verifiedEmail: false
 *                   verifiedMember: false
 *                   role: "SubAdmin"
 *                   id: "9a0b342a-91d3-4bf8-b200-95fff6c416fc"
 *                   email: "SubAdmin@example.com"
 *                 access_token: ""
 *       401:
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               example:
 *                 err: "Unauthorized"
 */

// Get all SubAdmins
/**
 * @swagger
 * /api/admin-sub/:
 *   get:
 *     tags:
 *       - "SubAdmin"
 *     summary: "Get all SubAdmin accounts"
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
 *                     example: "1"
 *                   username:
 *                     type: string
 *                     example: "SubAdmin123"
 *                   email:
 *                     type: string
 *                     example: "SubAdmin@example.com"
 *                   phone:
 *                     type: string
 *                     example: "123-456-7890"
 *                   profile:
 *                     type: string
 *                     example: "https://example.com/SubAdmin-profile.jpg"
 *                   roles:
 *                     type: integer
 *                     example: 1
 *       401:
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               example:
 *                 err: "Unauthorized"
 */

// Get an SubAdmin by id
/**
 * @swagger
 * /api/admin-sub/{id}:
 *   get:
 *     tags:
 *       - "SubAdmin"
 *     summary: "Get an SubAdmin account by ID"
 *     parameters:
 *       - in: query
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         example: "1"
 *     responses:
 *       200:
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                   example: "1"
 *                 username:
 *                   type: string
 *                   example: "SubAdmin123"
 *                 email:
 *                   type: string
 *                   example: "SubAdmin@example.com"
 *                 phone:
 *                   type: string
 *                   example: "123-456-7890"
 *                 profile:
 *                   type: string
 *                   example: "https://example.com/SubAdmin-profile.jpg"
 *                 roles:
 *                   type: integer
 *                   example: 1
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
 *                 err: "SubAdmin not found"
 */

// Update SubAdmin
/**
 * @swagger
 * /api/admin-sub/{id}:
 *   put:
 *     tags:
 *       - "SubAdmin"
 *     summary: "Update an SubAdmin account by ID"
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         example: "1"
 *       - in: query
 *         name: username
 *         schema:
 *           type: string
 *         example: "new_SubAdmin123"
 *       - in: query
 *         name: email
 *         schema:
 *           type: string
 *         example: "new_SubAdmin@example.com"
 *       - in: query
 *         name: phone
 *         schema:
 *           type: string
 *         example: "987-654-3210"
 *       - in: query
 *         name: profile
 *         schema:
 *           type: string
 *         example: "https://example.com/new-SubAdmin-profile.jpg"
 *       - in: query
 *         name: roles
 *         schema:
 *           type: integer
 *         example: 2
 *     responses:
 *       200:
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               example:
 *                 message: "SubAdmin account updated successfully"
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
 *                 err: "SubAdmin not found"
 *       409:
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               example:
 *                 err: "Username or email already in use"
 */

// Delete an SubAdmin
/**
 * @swagger
 * /api/admin-sub/{id}:
 *   delete:
 *     tags:
 *       - "SubAdmin"
 *     summary: "Delete an SubAdmin account by ID"
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         example: "1"
 *     responses:
 *       200:
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               example:
 *                 message: "SubAdmin account deleted successfully"
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
 *                 err: "SubAdmin not found"
 */
