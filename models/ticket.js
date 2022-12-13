import { model, Schema } from "mongoose";

const ticketSchema = new Schema(
  {
    user_ID: String,
    tripInfo: [String],
    busInfo: [String],
    price: Number,
  },
  { timestamps: true }
);

export default model("Ticket", ticketSchema);
