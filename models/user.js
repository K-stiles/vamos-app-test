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
    roles: {
      User: { type: Number, default: 1050 },
      SubAdmin: Number,
      Admin: Number,
    },
    refreshToken: [String],
  },
  { timestamps: true }
);

export default model("User", userSchema);
