import { model, Schema } from "mongoose";

const tripSchema = new Schema(
  {
    destinationRegion: String,
    arrivalRegion: String,
    destination: String,
    arrival: String,
    departureDate: String,
    arrivalDate: String,
    departureTime: String,
    arrivalTime: String,
    duration: Number,
    distance: Number,
  },
  { timestamps: true }
);

export default model("Trip", tripSchema);
