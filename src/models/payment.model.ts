import mongoose from "mongoose";

export interface PaymentInput {
    tripId: string;
    mode: string;
    amount: number;
}

export interface PaymentDocument extends PaymentInput, mongoose.Document {
    createdAt: Date;
    updatedAt: Date;
}

const paymentSchema = new mongoose.Schema(
    {
        tripId: { type: mongoose.Types.ObjectId, required: true },
        mode: { type: String, required: true, lowercase: true },
        amount: { type: Number, required: true },
        payment_date: { type: Date, required: true, default: Date.now() }
    },
    {
        timestamps: true
    }
);

const PaymentModel = mongoose.model<PaymentDocument>("Payment", paymentSchema);

export default PaymentModel;
