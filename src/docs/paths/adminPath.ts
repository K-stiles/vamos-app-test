// Register as administrator
/**
 * @swagger
 * /api/admin/auth-register:
 *   post:
 *     tags:
 *       - "Authentication"
 *     summary: "Create an admin account"
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
 *                 example: "admin123"
 *               email:
 *                 type: string
 *                 example: "admin@example.com"
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
 *                 example: "https://example.com/admin-profile.jpg"
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
 *                 message: "Admin account created successfully"
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
 *                 err: "Admin account already exists"
 */

// Login as admin
/**
 * @swagger
 * /api/admin/auth-login:
 *   post:
 *     tags:
 *       - "Authentication"
 *     summary: "Login as an admin"
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
 *                 example: "admin@example.com"
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
 *                   role: "admin"
 *                   id: "9a0b342a-91d3-4bf8-b200-95fff6c416fc"
 *                   email: "admin@example.com"
 *                 access_token: ""
 *       401:
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               example:
 *                 err: "Unauthorized"
 */

// Get all admins
/**
 * @swagger
 * /api/admin/get-all:
 *   get:
 *     tags:
 *       - "Admin"
 *     summary: "Get all admin accounts"
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
 *                     example: "admin123"
 *                   email:
 *                     type: string
 *                     example: "admin@example.com"
 *                   phone:
 *                     type: string
 *                     example: "123-456-7890"
 *                   profile:
 *                     type: string
 *                     example: "https://example.com/admin-profile.jpg"
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

// Get an admin by id
/**
 * @swagger
 * /api/admin/{id}:
 *   get:
 *     tags:
 *       - "Admin"
 *     summary: "Get an admin account by ID"
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
 *                   example: "admin123"
 *                 email:
 *                   type: string
 *                   example: "admin@example.com"
 *                 phone:
 *                   type: string
 *                   example: "123-456-7890"
 *                 profile:
 *                   type: string
 *                   example: "https://example.com/admin-profile.jpg"
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
 *                 err: "Admin not found"
 */

// Update admin
/**
 * @swagger
 * /api/admin/{id}:
 *   put:
 *     tags:
 *       - "Admin"
 *     summary: "Update an admin account by ID"
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
 *         example: "new_admin123"
 *       - in: query
 *         name: email
 *         schema:
 *           type: string
 *         example: "new_admin@example.com"
 *       - in: query
 *         name: phone
 *         schema:
 *           type: string
 *         example: "987-654-3210"
 *       - in: query
 *         name: profile
 *         schema:
 *           type: string
 *         example: "https://example.com/new-admin-profile.jpg"
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
 *                 message: "Admin account updated successfully"
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
 *                 err: "Admin not found"
 *       409:
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               example:
 *                 err: "Username or email already in use"
 */

// Delete an admin
/**
 * @swagger
 * /api/admin/{id}:
 *   delete:
 *     tags:
 *       - "Admin"
 *     summary: "Delete an admin account by ID"
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
 *                 message: "Admin account deleted successfully"
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
 *                 err: "Admin not found"
 */
