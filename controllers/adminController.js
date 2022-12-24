import bcrypt from "bcryptjs";

import Admin from "../models/admin.js";
import { generateAccessToken } from "../utils/tokenGen.js";
import { parentError } from "../utils/error.js";
import {
  adminInputValidate,
  adminValidateRegInput,
} from "../utils/inputValidator.js";

//  CONTROLLERS
export const getAdmin = async (req, res, next) => {
  try {
    const admin = await Admin.findById(req.params.id);
    if (!admin) return res.status(500).json("Admin doesnot exit");
    const { password, ...adminDoc } = admin._doc;
    res.status(200).json({ data: { ...adminDoc } });
  } catch (error) {
    next(error);
  }
};

export const getAdmins = async (req, res, next) => {
  try {
    const admin = await Admin.find();
    if (!admin) return res.status(500).json("No Admin was found");
    //TODO: REMOVE ADMIN PASSWORDS FROM FETCH OUTPUT
    res.status(200).json(admin);
  } catch (error) {
    next(error);
  }
};

//Update Admin
export const updateAdmin = async (req, res, next) => {
  try {
    const admin = await Admin.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );

    res.status(200).json(admin);
  } catch (error) {
    next(error);
  }
};

//Delete Admin
export const deleteAdmin = async (req, res, next) => {
  try {
    await Admin.findByIdAndDelete(req.params.id);

    res.status(200).json("Admin successfully deleted");
  } catch (error) {
    next(error);
  }
};

export const register = async (req, res, next) => {
  const { email, username, phone, password } = req.body;
  const { errors, valid } = adminValidateRegInput(
    email,
    phone,
    username,
    password
  );
  if (!valid) return next(parentError(409, errors));

  try {
    const saltSync = bcrypt.genSaltSync(10);
    const Password = bcrypt.hashSync(password, saltSync);
    const admin = await Admin.create({
      username,
      phone,
      password: Password,
      email,
    });
    const { password: pwd, ...adminDoc } = admin._doc;
    res.status(201).json({
      succcess: true,
      message: "User successfully created",
      data: { ...adminDoc },
    });
  } catch (error) {
    next(error);
  }
};

export const loginAsAdmin = async (req, res, next) => {
  const { email, password } = req.body;
  const { errors, valid } = adminInputValidate(email, password);
  if (!valid) return next(parentError(409, errors));

  try {
    const admin = await Admin.findOne({ email }).exec();
    if (!admin) return next(parentError(404, "Admin account not found"));
    const match = bcrypt.compareSync(password, admin.password);
    if (!match) return next(parentError(400, "Invalid Credentials"));
    const access_token = generateAccessToken(admin);
    const { password: Password, ...adminDoc } = admin._doc;
    res.status(200).json({ data: { ...adminDoc, access_token } });
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

    const user = await Admin.findOne({ refreshToken }).exec();
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
