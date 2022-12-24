import { model, Schema } from "mongoose";

const subAdminSchema = new Schema(
  {
    username: { type: String, lowercase: true },
    phone: {
      type: String,
      required: true,
      unique: true,
    },
    password: { type: String, require: true },
    // roles: {
    //   User: Number,
    //   SubAdmin: { type: Number, default: 2500 },
    //   Admin: Number,
    // },
    roles: {
      type: Number,
      default: 2500,
      enum: [3000, 2500, 2000],
    },
    profile: { type: String, default: "" },
    refreshToken: [String],
  },
  { timestamps: true }
);

export default model("SubAdmin", subAdminSchema);
