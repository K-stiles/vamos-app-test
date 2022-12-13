import Admin from "../models/admin.js";

//  CONTROLLERS
export const getAdmin = async (req, res, next) => {
  try {
    const admin = await Admin.findById(req.params.id);
    if (!admin) return res.status(500).json("Admin doesnot exit");

    res.status(200).json(admin);
  } catch (error) {
    next(error);
  }
};

export const getAdmins = async (req, res, next) => {
  try {
    const admin = await Admin.find();
    if (!admin) return res.status(500).json("No Admin was found");

    res.status(200).json(admin);
  } catch (error) {
    next(error);
  }
};

//CREATE Admin
export const createAdmin = async (req, res, next) => {
  try {
    const newAdmin = new Admin(req.body);
    const admin = await newAdmin.save();

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
