import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import * as dotenv from "dotenv";
import twilio from "twilio";

import User from "../models/user.js";
import { validateInInput, validateRegInput } from "../utils/inputValidator.js";
import { parentError } from "../utils/error.js";

dotenv.config();

function generateAccessToken(user) {
  const roles = Object.values(user.roles).filter(Boolean);
  return jwt.sign(
    {
      data: {
        id: user._id,
        phone: user.phone,
        roles,
      },
    },
    process.env.ACCESS_TOKEN_SECRETE,
    { expiresIn: "10m" }
  );
}

// function generateRefeshToken(user) {
//   return jwt.sign(
//     { id: user._id, phone: user.phone },
//     process.env.RREFRESH_TOKEN_SECRETE,
//     { expiresIn: "1d" }
//   );
// };

const twilioClient = new twilio(
  process.env.TWILIO_SID,
  process.env.TWILIO_AUTH_TOKEN
);

export const register = async (req, res, next) => {
  const { username, phone, password } = req.body;
  const { errors, valid } = validateRegInput(phone, username, password);
  if (!valid) return next(parentError(409, errors));

  try {
    const user = await User.findOne({ phone }).exec();
    if (user) return next(parentError(409, "User already exists."));
    const service = await twilioClient.verify.v2.services(
      process.env.TWILIO_VERIFICATION_SID
    );
    await service.verifications.create({
      to: `+233${phone}`,
      channel: "sms",
    });

    return res
      .status(200)
      .json("A verification OTP has been sent to your phone/SMS");
  } catch (error) {
    next(error);
  }
};

export const authVerificathion = async (req, res, next) => {
  const { username, phone, password: Password, otp } = req.body;
  const { errors, valid } = validateRegInput(phone, username, Password);
  if (!valid) return next(parentError(409, errors));

  try {
    const service = await twilioClient.verify.v2.services(
      process.env.TWILIO_VERIFICATION_SID
    );
    const verify = await service.verificationChecks.create({
      to: `+233${phone}`,
      code: otp,
    });
    if (!verify?.valid)
      return next(
        parentError(
          403,
          "Please verify your account first. Check your Messages/SMS"
        )
      );

    const saltSync = bcrypt.genSaltSync(10);
    const password = bcrypt.hashSync(Password, saltSync);
    const newUser = new User({
      username,
      phone,
      password,
      roles: {
        User: 1050,
        Admin: 2050,
      },
    });
    const user = await newUser.save();
    res
      .status(201)
      .json({ succcess: true, message: "User successfully created", user });
  } catch (error) {
    next(error);
  }
};

export const login = async (req, res, next) => {
  const { phone, password } = req.body;
  const { errors, valid } = validateInInput(phone, password);
  if (!valid) return next(parentError(409, errors));

  try {
    const user = await User.findOne({ phone }).exec();
    if (!user) return next(parentError(404, "User not found"));
    const match = bcrypt.compareSync(password, user.password);
    if (!match) return next(parentError(400, "Invalid Username or Password"));
    const access_token = generateAccessToken(user);
    const { password: Password, ...userDoc } = user._doc;
    res.status(200).json({ data: { ...userDoc, access_token } });
  } catch (error) {
    next(error);
  }
};

//LOGOUT
export const logout = async (req, res, next) => {
  try {
    // On client, also delete the accessToken

    const cookies = req.cookies;
    if (!cookies?.vamos) return res.status(204).json("No content");
    const refreshToken = cookies.vamos;

    const user = await User.findOne({ refreshToken }).exec();
    if (!user) {
      res.clearCookie("vamos", {
        httpOnly: true,
        secure: true,
        sameSite: "None",
      });
      return res.status(204).json("No content");
    }

    user.refreshToken = "";
    await user.save();

    res.clearCookie("vamos", {
      httpOnly: true,
      secure: true,
      sameSite: "None",
    });
    res.status(200).json({ message: "Logout was successful" });
  } catch (error) {
    next(error);
  }
};

//Forgot Password
//Reset Password
