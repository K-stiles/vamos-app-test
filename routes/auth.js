import express from "express";
const router = express.Router();

import {
  authVerificathion,
  login,
  logout,
  register,
  //   sendOTP,
  //   verifyUser,
} from "../controllers/authController.js";

/**
 * @swagger
 * /api/auth/sendotp:
 *  post:
 *    summary: Send OTP to the user's phone number
 *    tags: [Users]
 *    requestBody:
 *      required: true
 *      content:
 *            application/json:
 *              schema:
 *                example:
 *                  phone: "0247157301"
 *    responses:
 *      200:
 *          description: A verification OTP has been sent to your phone/SMS
 *      500:
 *        description: Error occurred
 *
 *
 */

/**
 * @swagger
 * /api/auth/verify:
 *  post:
 *    summary: Verify a user
 *    tags: [Users]
 *    requestBody:
 *      required: true
 *      content:
 *            application/json:
 *              schema:
 *                example:
 *                  username: "Abednego Jilima"
 *                  phone: "0247157301"
 *                  otp: "23456"
 *    responses:
 *      200:
 *          description: user account has successfully been created
 *          content:
 *            application/json:
 *              schema:
 *                type : array
 *                items:
 *                  $ref: '#/components/schemas/User'
 *      201:
 *        description: user has been Logged in
 *        content:
 *          application/json:
 *              schema:
 *                  type : array
 *                  items:
 *                      $ref: '#/components/schemas/User'
 *      403:
 *        description: Please verify your account first. Check your Messages/SMS
 *      500:
 *        description: Phone number must be valid
 *      404:
 *        description: Error Occurred
 */

router.post("/register", register);
router.post("/otpverification", authVerificathion);
router.post("/login", login);
router.get("/logout", logout);
// router.post("/resendVerificationCode", resendOTP);

export default router;
