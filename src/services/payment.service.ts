import { get } from "lodash";
import { FilterQuery, QueryOptions, UpdateQuery } from "mongoose";

import Payment, { PaymentDocument, PaymentInput } from "../models/payment.model";
import { parentError } from "../functions/error";

export async function createPayment(input: PaymentInput) {
    try {
        const result = await Payment.create(input);
        return result;
    } catch (error: any) {
        throw parentError(400, error);
    }
}

export async function readallPayments(query: FilterQuery<PaymentDocument>, options: QueryOptions = { lean: true }) {
    try {
        const payments = await Payment.find(query, {}, options);
        if (!payments) return false;
        return payments;
    } catch (error: any) {
        throw parentError(400, error);
    }
}

export async function readPayment(query: FilterQuery<PaymentDocument>) {
    try {
        const payment = await Payment.findById(query).lean();
        if (!payment) throw parentError(404, "Payment Data Not Found");
        return payment;
    } catch (error: any) {
        throw parentError(400, error);
    }
}

export async function modifyPayment(query: FilterQuery<PaymentDocument>, update: UpdateQuery<PaymentDocument>, options: QueryOptions) {
    try {
        const payment = await Payment.findByIdAndUpdate(query, update, options);
        if (!payment) throw parentError(404, "Payment Data Not Found");
        return payment;
    } catch (error: any) {
        throw parentError(400, error);
    }
}

export async function disablePayment(query: FilterQuery<PaymentDocument>) {
    try {
        return await Payment.findByIdAndDelete(query);
    } catch (error: any) {
        throw parentError(400, error);
    }
}
