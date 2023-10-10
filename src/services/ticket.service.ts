import { get } from "lodash";
import { FilterQuery, QueryOptions, UpdateQuery } from "mongoose";

import Ticket, { TicketDocument, TicketInput } from "../models/ticket.model";
import { parentError } from "../functions/error";

export async function createTicket(input: TicketInput) {
    try {
        const result = await Ticket.create(input);
        return result;
    } catch (error: any) {
        throw parentError(400, error);
    }
}
export async function createManyTickets(input: TicketInput[]) {
    try {
        const result = await Ticket.insertMany(input);
        return result;
    } catch (error: any) {
        throw parentError(400, error);
    }
}

export async function readallTickets(query: FilterQuery<TicketDocument>, options: QueryOptions = { lean: true }) {
    try {
        const tickets = await Ticket.find(query, {}, options);
        if (!tickets) return false;
        return tickets;
    } catch (error: any) {
        throw parentError(400, error);
    }
}

export async function readTicket(query: FilterQuery<TicketDocument>) {
    try {
        const ticket = await Ticket.findById(query).lean();
        if (!ticket) throw parentError(404, "Ticket Data Not Found");
        return ticket;
    } catch (error: any) {
        throw parentError(400, error);
    }
}

export async function modifyTicket(query: FilterQuery<TicketDocument>, update: UpdateQuery<TicketDocument>, options: QueryOptions) {
    try {
        const ticket = await Ticket.findByIdAndUpdate(query, update, options);
        if (!ticket) throw parentError(404, "Ticket Data Not Found");
        return ticket;
    } catch (error: any) {
        throw parentError(400, error);
    }
}

export async function disableTicket(query: FilterQuery<TicketDocument>) {
    try {
        return await Ticket.findByIdAndDelete(query);
    } catch (error: any) {
        throw parentError(400, error);
    }
}
