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

export default model("SubAdmin", subAdminSchema);
