import { model, Schema } from "mongoose";

const ticketSchema = new Schema(
  {
    agency: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    pickupLocation: {
      type: String,
      required: true,
    },
    destination: {
      type: String,
      required: true,
    },
    contact: {
      type: Array,
      default: [],
    },
  },
  { timestamps: true }
);

export default model("Ticket", ticketSchema);
