// Register a user
/**
 * @swagger
 * /api/v1/auth/register:
 *   post:
 *     tags: [Authentication]
 *     summary: "User information sent to the server for registration"
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *                 example: "trailmail"
 *               phone:
 *                 type: string
 *                 example: "02445554445"
 *               password:
 *                 type: string
 *                 example: "password1234"
 *     responses:
 *       201:
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
 *                 okay: true
 *                 status: 201
 *                 data:
 *                   verifiedEmail: false
 *                   verifiedMember: false
 *                   role: "member"
 *                   id: "9a0b342a-91d3-4bf8-b200-95fff6c416fc"
 *                   email: "me@gmail.com"
 *       409:
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               example:
 *                 err: "Email Already Exists"
 */

// Verify a user and OTP
/**
 * @swagger
 * /api/v1/auth/otpverification:
 *   post:
 *     tags: [Authentication]
 *     summary: "Verifies user credentials and OTP"
 *     parameters:
 *       - in: query
 *         name: username
 *         required: true
 *         schema:
 *           type: string
 *         example: "trailmail"
 *       - in: query
 *         name: phone
 *         required: true
 *         schema:
 *           type: string
 *         example: "02445554445"
 *       - in: query
 *         name: password
 *         required: true
 *         schema:
 *           type: string
 *           format: password
 *         example: "password1234"
 *       - in: query
 *         name: otp
 *         required: true
 *         schema:
 *           type: string
 *         example: "123456"
 *     responses:
 *       200:
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               example:
 *                 okay: true
 *                 status: 200
 *                 data:
 *                   token: "your_generated_token_here"
 *                   user:
 *                     id: "9a0b342a-91d3-4bf8-b200-95fff6c416fc"
 *                     email: "me@gmail.com"
 *                     role: "member"
 *       401:
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               example:
 *                 err: "Invalid credentials"
 */

// Login endpoint
/**
 * @swagger
 * /api/v1/auth/login:
 *   post:
 *     tags:
 *       - "Authentication"
 *     summary: Log in a user
 *     description: "Route to login user or admin"
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 description: "User Email"
 *                 example: "trail.mail@gmail.com"
 *               password:
 *                 type: string
 *                 description: "User password"
 *                 example: "password1234"
 *     responses:
 *       409:
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               example:
 *                 err: "User does not exist"
 *       400:
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               example:
 *                 err: "Invalid Credentials"
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
 *                   role: "member"
 *                   id: "9a0b342a-91d3-4bf8-b200-95fff6c416fc"
 *                   email: "me@gmail.com"
 *                 access_token: "your_access_token_here"
 *       412:
 *         $ref: "#/components/responses/Unauthorized"
 */

// Logout endpoint
/**
 * @swagger
 * /api/v1/auth/logout:
 *   get:
 *     tags:
 *       - "Authentication"
 *     summary: Log out a user
 *     description: "Route to logout user or admin"
 *     responses:
 *       200:
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               example:
 *                 message: "Logout successful"
 *       401:
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               example:
 *                 err: "Unauthorized"
 */
