import User from "../models/user.js";

//GET USER
export const getUser = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) return res.status(500).json("User does not exit");
    res.status(200).json(user);
  } catch (error) {
    next(error);
  }
};

//GET USERS
export const getUsers = async (req, res, next) => {
  try {
    const users = await User.find();
    if (!users) return res.status(500).json("No user was found"); //correct leave same...!
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
    if (!user) return res.status(404).json("User does not exit/ Unauthorized");
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
