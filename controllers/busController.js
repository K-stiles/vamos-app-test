import Bus from "../models/bus.js";

//  CONTROLLERS
export const getBus = async (req, res) => {
  try {
    const bus = await Bus.findById(req.params.id);
    if (!bus) return res.status(500).json("Bus does not exit");

    res.status(200).json(bus);
  } catch (error) {
    res.status(404).json(error.message);
  }
};

export const getBuses = async (req, res) => {
  try {
    const bus = await Bus.find();
    if (!bus) return res.status(500).json("No bus was found"); //correct leave same...!

    res.status(200).json(bus);
  } catch (error) {
    res.status(404).json(error.message);
  }
};

//CREATE bus
export const createBus = async (req, res) => {
  try {
    const newBus = new Bus(req.body);
    const bus = await newBus.save();

    res.status(200).json(bus);
  } catch (error) {
    res.status(500).json(error);
  }
};

//Update bus
export const updateBus = async (req, res) => {
  try {
    const bus = await Bus.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );

    res.status(200).json(bus);
  } catch (error) {
    res.status(500).json(error);
  }
};

//Delete bus
export const deleteBus = async (req, res) => {
  try {
    const bus = await Bus.findByIdAndDelete(req.params.id);
    if (!bus) return res.status(404).json("Bus does not exit");

    res.status(200).json("Bus successfully deleted");
  } catch (error) {
    res.status(500).json(error);
  }
};

//Update update Bus Filled Seats
export const updateBusFilledSeats = async (req, res) => {
  const { id } = req.params;
  const { passengers } = req.body;
  try {
    const busSeats = await Bus.findById(req.params.id);
    if (!busSeats) return res.status(500).json("Bus does not exit");

    const availableSeats = busSeats.totalBusSeats - busSeats.filledSeats;

    if (busSeats.filledSeats >= busSeats.totalBusSeats) {
      res.status(200).json({
        message: "Bus is full please consider joining the next bus Thank you!",
        "Seats available": availableSeats,
      });
    } else if (
      busSeats.filledSeats + passengers > busSeats.totalBusSeats ||
      availableSeats <= -1
    ) {
      res.status(401).json({
        message: `Please there are ${availableSeats} space left. ${availableSeats} of you can join us for the others to join the next bus. Thank You! `,
      });
    } else {
      const bus = await Bus.updateOne(
        { _id: id },
        { $inc: { filledSeats: +passengers } }
      );

      res.status(200).json(bus);
    }
  } catch (error) {
    res.status(500).json(error);
  }
};
//Update reset Bus Seats
export const resetBusSeats = async (req, res) => {
  const { id } = req.params;
  try {
    const bus = await Bus.updateOne({ _id: id }, { $set: { filledSeats: 0 } });
    if (!bus) return res.status(500).json("Bus does not exit");

    res.status(200).json(bus);
  } catch (error) {
    res.status(500).json(error);
  }
};
