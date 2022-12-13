import Trip from "../models/trip.js";

//  CONTROLLERS

//CREATE Trip
export const createTrip = async (req, res) => {
  try {
    const newTrip = new Trip(req.body);
    const trip = await newTrip.save();
    res.status(200).json(trip);
  } catch (error) {
    res.status(500).json(error);
  }
};

//GET Trips
export const getTrips = async (req, res) => {
  try {
    const trips = await Trip.find();
    if (!trips) return res.status(500).json("No Trip was found"); //correct leave same...!
    res.status(200).json(trips);
  } catch (error) {
    res.status(404).json(error);
  }
};

//GET Trip
export const getTrip = async (req, res) => {
  try {
    const trip = await Trip.findById(req.params.id);
    if (!trip) return res.status(500).json("Trip does not exit");
    res.status(200).json(trip);
  } catch (error) {
    res.status(404).json(error);
  }
};

//Update Trip
export const updateTrip = async (req, res) => {
  const id = req.params.id;
  try {
    const trip = await Trip.findByIdAndUpdate(
      id,
      { $set: req.body },
      { new: true }
    );
    res.status(200).json(trip);
  } catch (error) {
    res.status(404).json(error);
  }
};

//Delete Trip
export const deleteTrip = async (req, res) => {
  try {
    await Trip.findByIdAndDelete(req.params.id);
    res.status(200).json("Trip successfully deleted");
  } catch (error) {
    res.status(404).json(error);
  }
};
