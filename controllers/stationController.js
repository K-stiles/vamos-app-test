import Station from "../models/station.js";

//  CONTROLLERS
export const getStation = async (req, res) => {
  try {
    const station = await Station.findById(req.params.id);
    if (!station) return res.status(500).json("Station does not exit");
    res.status(200).json(station);
  } catch (error) {
    res.status(404).json(error.message);
  }
};

export const getStations = async (req, res) => {
  try {
    const stations = await Station.find();
    if (!stations) return res.status(500).json("No Station was found"); //correct leave same...!

    res.status(200).json(stations);
  } catch (error) {
    res.status(404).json(error.message);
  }
};

//CREATE Station
export const createStation = async (req, res) => {
  try {
    const newStation = new Station(req.body);
    const savedStation = await newStation.save();
    res.status(200).json(savedStation);
  } catch (error) {
    res.status(500).json(error);
  }
};

//Update Station
export const updateStation = async (req, res) => {
  try {
    const station = await Station.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );
    res.status(200).json(station);
  } catch (error) {
    res.status(500).json(error);
  }
};

//Delete Station
export const deleteStation = async (req, res) => {
  try {
    await Station.findByIdAndDelete(req.params.id);
    res.status(200).json("Station successfully deleted");
  } catch (error) {
    res.status(500).json(error);
  }
};
