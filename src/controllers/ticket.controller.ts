import { Request, Response, NextFunction } from "express";

import { createManyTickets, createTicket, disableTicket, modifyTicket, readTicket, readallTickets } from "../services/ticket.service";
import { CreateManyTicketsInput, CreateTicketInput, ReadTicketInput, UpdateTicketInput } from "../schema/ticket.schema";
import { parentError } from "../functions/error";

/** create Ticket */
export async function addTicket(req: Request<{}, {}, CreateTicketInput["body"]>, res: Response) {
    // const userId = res.locals.user._id;

    const body = req.body;

    const ticket = await createTicket({ ...body });

    return res.send(ticket);
}

/** create Many Tickets */
export async function addTickets(req: Request<{}, {}, CreateManyTicketsInput["body"]>, res: Response) {
    // const userId = res.locals.user._id;

    const body = req.body;
    const ticket = await createManyTickets(body);

    return res.send(ticket);
}

/** get all Ticket */
export const getTicket = async (req: Request<ReadTicketInput["params"]>, res: Response, next: NextFunction) => {
    const ticketId = req.params?.ticketId;
    try {
        const ticket = await readTicket({ _id: ticketId });
        if (!ticket) {
            throw parentError(404, "Requested ticket information was not found");
        }
        res.status(200).json(ticket);
    } catch (error) {
        next(error);
    }
};

/** get Ticket  */
export const getTickets = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const tickets = await readallTickets({});
        if (!tickets) {
            throw parentError(404, "No Ticket Data was found");
        }
        res.status(200).json(tickets);
    } catch (error) {
        next(error);
    }
};

/**  Update Ticket */
export const updateTicket = async (req: Request<UpdateTicketInput["params"]>, res: Response, next: NextFunction) => {
    try {
        const ticketId = req.params?.ticketId;
        const update = req.body;

        const ticket = await readTicket({ _id: ticketId });

        if (!ticket) {
            throw parentError(404, "Requested ticket information was not found");
        }

        const updatedTicket = await modifyTicket({ _id: ticketId }, update, {
            new: true
        });

        return res.status(200).json(updatedTicket);
    } catch (error) {
        next(error);
    }
};

/** Delete Ticket */
export const deleteTicket = async (req: Request<UpdateTicketInput["params"]>, res: Response, next: NextFunction) => {
    const ticketId = req.params.ticketId;
    try {
        // const ticket = await readTicket({ ticketId });
        // if (!ticket) {
        //     return parentError(404, "Requested account information was not found");
        // }

        await disableTicket({ _id: ticketId });
        res.status(200).json("Ticket successfully deleted");
    } catch (error) {
        next(error);
    }
};
