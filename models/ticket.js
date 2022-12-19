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
      //TODO: changed From to Departure
      type: String,
      required: true,
    },
    destination: {
      //TODO: changed to to Destination
      type: String,
      required: true,
    },
    // date: { type: Date, default: Date.now, required: true },
    // contact: [{ String }], //TODO: Added Ticket contact info-will modify
  },
  { timestamps: true }
);

export default model("Ticket", ticketSchema);
