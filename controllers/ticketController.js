import Ticket from "../models/ticket.js";

//CREATE Tickets
export const createTicket = async (req, res) => {
    try {
      const newTicket = new Ticket(req.body);
      const ticket = await newTicket.save();
      res.status(200).json(ticket);
    } catch (error) {
      res.status(500).json(error);
    }
  };

//GET TICKET
export const getTicket= async (req, res, next) => {
  try {
    const ticket = await Ticket.findById(req.params.id);
    if (!ticket) return res.status(500).json("Ticket does not exit");
    res.status(200).json(ticket);
  } catch (error) {
    next(error);
  }
};

//GET TICKETS
export const getTickets = async (req, res, next) => {
  try {
    const tickets = await Ticket.find();
    if (!tickets) return res.status(500).json("No ticket was found"); 
    res.status(200).json(tickets);
  } catch (error) {
    next(error);
  }
};

//Update Ticket
export const updateTicket = async (req, res, next) => {
  try {
    const ticket = await Ticket.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );
    if (!ticket) return res.status(404).json("Ticket does not exit");
    res.status(200).json(ticket);
  } catch (error) {
    next(error);
  }
};

//Delete Ticket
export const deleteTicket = async (req, res, next) => {
  try {
    await Ticket.findByIdAndDelete(req.params.id);
    res.status(200).json("Ticket has been successfully deleted");
  } catch (error) {
    next(error);
  }
};

// get a total amount of tickets
export const getAmount = async(req, res, next)=>{
  try {
    const {limit} = req.body
    const tickets= await Ticket.find().limit(limit);
     if (!tickets) return res.status(500).json("No ticket was found"); 
    res.status(200).json(tickets);
  } catch (error) {
    next(error)
  }
}

//get tickets based on destination 

export const getDestTickets= async(req, res, next)=>{ //Ticket Module do not have a destination field
     const {destination} = req.body
    const tickets= await Ticket.find().sort({destination:destination});
     if (!tickets) return res.status(500).json("No ticket was found"); 
    res.status(200).json(tickets);

}

//get tickets based on departure

export const getDepartTickets= async(req, res, next)=>{ //Ticket Module do not have a departure field
  const {departure} = req.body
 const tickets= await Ticket.find().sort({departure:departure});
  if (!tickets) return res.status(500).json("No ticket was found"); 
 res.status(200).json(tickets);

}