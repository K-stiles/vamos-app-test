import { object, number, string, TypeOf, date } from "zod";

const payload = {
    body: object({
        tripId: string({
            required_error: "tripId is required"
        }),
        mode: string({
            required_error: "payment mode is required"
        }),
        amount: number({
            required_error: "amount is required"
        })
    })
};

const params = {
    params: object({
        paymentId: string({
            required_error: "paymentId is required"
        })
    })
};

export const createPaymentSchema = object({
    ...payload
});

export const updatePaymentSchema = object({
    ...payload,
    ...params
});

export const deletePaymentSchema = object({
    ...params
});

export const getPaymentSchema = object({
    ...params
});

export type CreatePaymentInput = TypeOf<typeof createPaymentSchema>;
export type UpdatePaymentInput = TypeOf<typeof updatePaymentSchema>;
export type ReadPaymentInput = TypeOf<typeof getPaymentSchema>;
export type DeletePaymentInput = TypeOf<typeof deletePaymentSchema>;
