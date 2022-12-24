import Ticket from "../models/ticket.js";

//CREATE Tickets
export const createTicket = async (req, res, next) => {
  try {
    const newTicket = new Ticket(req.body);
    const ticket = await newTicket.save();
    res.status(200).json(ticket);
  } catch (error) {
    next(error);
  }
};

//GET TICKET
export const getTicket = async (req, res, next) => {
  try {
    const ticket = await Ticket.findById(req.params.ticketId);
    if (!ticket) return next(parentError(404, "Ticket does not exit"));
    res.status(200).json(ticket);
  } catch (error) {
    next(error);
  }
};

//TODO: ORIGNAL
//GET TICKETS
// export const getTickets = async (req, res, next) => {
//   try {
//     const tickets = await Ticket.find();
//     if (!tickets) return  next(parentError(404, "No Ticket Found"));
//     res.status(200).json(tickets);
//   } catch (error) {
//     next(error);
//   }
// };

export const getTickets = async (req, res, next) => {
  try {
    const page = parseInt(req.query.page) - 1 || 0;
    const dataPerPage = parseInt(req.query.limit) || 10;
    const pickupLocation = req.query.pickupLocation || "";
    const destination = req.query.destination || "";

    let search = {};
    if (pickupLocation && destination) {
      search.$and = [
        { pickupLocation: new RegExp(pickupLocation, "i") },
        { destination: new RegExp(destination, "i") },
      ];
    }
    const ticketCollection = await Ticket.aggregate([
      {
        $match: search,
      },
    ])
      .skip(page * dataPerPage)
      .limit(dataPerPage);
    const ticketCollectionCount = await Ticket.estimatedDocumentCount();
    const totalPages = Math.ceil(ticketCollectionCount / dataPerPage);
    const currentPage = Math.ceil(ticketCollectionCount % page);
    res.status(200).send({
      data: ticketCollection,
      paging: {
        total: ticketCollectionCount,
        page: currentPage,
        pages: totalPages,
      },
    });
  } catch (error) {
    next(error);
  }
};

//Update Ticket
export const updateTicket = async (req, res, next) => {
  try {
    const ticket = await Ticket.findByIdAndUpdate(
      req.params.ticketId,
      { $set: req.body },
      { new: true }
    );
    if (!ticket) return next(parentError(404, "No Ticket Found"));
    res.status(200).json(ticket);
  } catch (error) {
    next(error);
  }
};

//Delete Ticket
export const deleteTicket = async (req, res, next) => {
  try {
    await Ticket.findByIdAndDelete(req.params.ticketId);
    res.status(200).json("Ticket successfully deleted");
  } catch (error) {
    next(error);
  }
};

// // get a total amount of tickets
// export const getAmount = async (req, res, next) => {
//   try {
//     const { limit } = req.body;
//     const tickets = await Ticket.find().limit(limit);
//     if (!tickets) return res.status(500).json("No ticket was found");
//     res.status(200).json(tickets);
//   } catch (error) {
//     next(error);
//   }
// };

// //get tickets based on destination

// export const getDestTickets = async (req, res, next) => {
//   //Ticket Module do not have a destination field
//   const { destination } = req.body;
//   const tickets = await Ticket.find().sort({ destination: destination });
//   if (!tickets) return res.status(500).json("No ticket was found");
//   res.status(200).json(tickets);
// };

// //get tickets based on departure

// export const getDepartTickets = async (req, res, next) => {
//   //Ticket Module do not have a departure field
//   const { departure } = req.body;
//   const tickets = await Ticket.find().sort({ departure: departure });
//   if (!tickets) return res.status(500).json("No ticket was found");
//   res.status(200).json(tickets);
// };
