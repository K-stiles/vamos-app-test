import mongoose from "mongoose";

export interface TripInput {
    ticketId: string;
    userId: string;
    purchase_date: Date;
}

export interface TripDocument extends TripInput, mongoose.Document {
    createdAt: Date;
    updatedAt: Date;
}

const tripSchema = new mongoose.Schema(
    {
        ticketId: { type: mongoose.Types.ObjectId, required: true },
        userId: { type: mongoose.Types.ObjectId, required: true },
        purchase_date: { type: Date, required: true, default: Date.now() }
    },
    {
        timestamps: true
    }
);

const TripModel = mongoose.model<TripDocument>("Trip", tripSchema);

export default TripModel;
