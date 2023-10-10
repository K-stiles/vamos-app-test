import { object, number, string, TypeOf, date } from "zod";

const payload = {
    body: object({
        ticketId: string({
            required_error: "ticketId is required"
        }),
        userId: string({
            required_error: "userId is required"
        }),
        purchase_date: date({
            required_error: "purchase_date is required"
        })
    })
};

const params = {
    params: object({
        tripId: string({
            required_error: "tripId is required"
        })
    })
};

export const createTripSchema = object({
    ...payload
});

export const updateTripSchema = object({
    ...payload,
    ...params
});

export const deleteTripSchema = object({
    ...params
});

export const getTripSchema = object({
    ...params
});

export type CreateTripInput = TypeOf<typeof createTripSchema>;
export type UpdateTripInput = TypeOf<typeof updateTripSchema>;
export type ReadTripInput = TypeOf<typeof getTripSchema>;
export type DeleteTripInput = TypeOf<typeof deleteTripSchema>;
