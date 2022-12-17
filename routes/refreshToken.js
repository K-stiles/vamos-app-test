import express from "express";
import jwt from "jsonwebtoken";
import User from "../models/user.js";

const router = express.Router();

router.get("/", async function (req, res) {
  try {
    const cookies = req.cookies;
    if (!cookies?.vamos) return res.status(401).json("Unauthorrized");
    const refreshToken = cookies.vamos;

    const user = await User.findOne({ refreshToken }).exec();
    if (!user) return res.status(403).json("Forbiden");

    const decoded = jwt.verify(
      refreshToken,
      process.env.RREFRESH_TOKEN_SECRETE
    );

    if (user.phone !== decoded.phone) return res.status(403).json("Forbiden");

    //TODO: ADD ROLES TO THE ACCESS TOKEM BEEM GENERATED
    // const roles = Object.values(user.roles).filter(Boolean);
    const accessToken = jwt.sign(
      { data: { id: user._id, phone: user.phone } },
      process.env.ACCESS_TOKEN_SECRETE,
      { expiresIn: "10m" }
    );

    res.status(200).json({ accessToken });
  } catch (err) {
    res.status(400).json({ message: err });
  }
});

export default router;
