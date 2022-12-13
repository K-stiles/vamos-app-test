import { model, Schema } from "mongoose";

const busSchema = new Schema(
  {
    name: String,
    drivername: String,
    image: String,

    Price: Number,
    destination: String,
    arrival: String,
    
    regNumber: String,
    departureDate: Date,
    filledSeats: { type: Number, default: 0 },
    totalBusSeats: { type: Number, default: 100 },
  },
  { timestamps: true }
);

export default model("Bus", busSchema);
