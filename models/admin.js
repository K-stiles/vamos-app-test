import mongoose from "mongoose";
const { Schema } = mongoose;

const adminSchema = new Schema(
  {
    username: { type: String, lowercase: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true, unique: true },
    phone: {
      type: String,
      required: true,
      unique: true,
    },
    roles: {
      User: { type: Number, default: 1050 },
      SubAdmin: Number,
      Admin: Number,
    },
    profile: { type: String, default: "" },
    refreshToken: [String],
  },
  { timestamps: true }
);

export default mongoose.model("Admin", adminSchema);
