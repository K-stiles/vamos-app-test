import { model, Schema } from "mongoose";

const stationSchema = new Schema(
  {
    Region: String,
    town: String,
    name: String,
    numberOfVehiclesimage: String,
    image: String,
  },
  { timestamps: true }
);

export default model("Station", stationSchema);
