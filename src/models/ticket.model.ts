import mongoose from "mongoose";

export interface TicketInput {
    name: String;
    price: number;
    departure: String;
    arrival: String;
    departureDate: Date;
    arrivalDate: Date;
    contact: string[];
}

export interface TicketDocument extends TicketInput, mongoose.Document {
    createdAt: Date;
    updatedAt: Date;
}

const ticketSchema = new mongoose.Schema(
    {
        name: { type: String, required: true, lowercase: true },
        price: { type: Number, required: true },
        departure: { type: String, required: true, lowercase: true },
        arrival: { type: String, required: true, lowercase: true },
        departureDate: { type: Date },
        arrivalDate: { type: Date },
        contact: [String]
    },
    {
        timestamps: true
    }
);

const TicketModel = mongoose.model<TicketDocument>("Ticket", ticketSchema);

export default TicketModel;
