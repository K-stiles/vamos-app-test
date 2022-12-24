import jwt from "jsonwebtoken";

export function generateAccessToken(user) {
  const roles = [user.roles];
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
