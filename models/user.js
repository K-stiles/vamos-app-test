import { model, Schema } from "mongoose";

const userSchema = new Schema(
  {
    username: { type: String, lowercase: true },
    phone: {
      type: String,
      required: true,
      unique: true,
    },
    password: { type: String, require: true },
    profile: { type: String, default: "" },
    // roles: {
    //   User: { type: Number, default: 2000 },
    //   SubAdmin: Number,
    //   Admin: Number,
    // },
    roles: {
      type: Number,
      default: 2000,
      enum: [3000, 2500, 2000],
    },
    refreshToken: [String],
  },
  { timestamps: true }
);

export default model("User", userSchema);
