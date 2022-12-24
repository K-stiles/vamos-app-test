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
      type: Number,
      default: 3000,
      enum: [3000, 2500, 2000],
    },
    // roles: {
    //   User: Number,
    //   SubAdmin: Number,
    //   Admin: {
    //     type: Number,
    //     default: 3000,
    //     enum: [3000, 2500, 2000],
    //   },
    // },
    profile: { type: String, default: "" },
    refreshToken: [String],
  },
  { timestamps: true }
);

export default mongoose.model("Admin", adminSchema);
