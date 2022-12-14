import User from "../models/user.js";
import { parentError } from "../utils/error.js";

//GET USER
export const getUser = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) return next(parentError(404, "No User Found"));
    const { password, ...userDoc } = user._doc;
    res.status(200).json({ ...userDoc });
  } catch (error) {
    next(error);
  }
};

//GET USERS
export const getUsers = async (req, res, next) => {
  try {
    const users = await User.find();
    if (!users) return next(parentError(404, "No User Found"));
    //TODO: EXCLUDE ALL USER PASSWORDS FROM THIS FETCH
    res.status(200).json(users);
  } catch (error) {
    next(error);
  }
};

//Update USER
export const updateUser = async (req, res, next) => {
  try {
    const user = await User.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );
    if (!user)
      return next(parentError(404, "User does not exit/ Unauthorized"));
    res.status(200).json(user);
  } catch (error) {
    next(error);
  }
};

//Delete USER
export const deleteUser = async (req, res, next) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    res.status(200).json("User account has been successfully deleted");
  } catch (error) {
    next(error);
  }
};
