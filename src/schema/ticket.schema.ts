import { object, number, string, TypeOf, date, array } from "zod";

const payload = {
    body: object({
        name: string({
            required_error: "Name is required"
        }),
        price: number({
            required_error: "Price is required"
        }),
        departure: string({
            required_error: "Departure is required"
        }),
        arrival: string({
            required_error: "Arrival is required"
        }),
        departureDate: date({
            required_error: "Departure Date is required"
        }),
        arrivalDate: date({
            required_error: "Arrival Date is required"
        }),
        contact: string().array()
    })
};
const more_tickets_payload = {
    body: object({
        name: string({
            required_error: "Name is required"
        }),
        price: number({
            required_error: "Price is required"
        }),
        departure: string({
            required_error: "Departure is required"
        }),
        arrival: string({
            required_error: "Arrival is required"
        }),
        departureDate: date({
            required_error: "Departure Date is required"
        }),
        arrivalDate: date({
            required_error: "Arrival Date is required"
        }),
        contact: string().array()
    }).array()
};

const params = {
    params: object({
        ticketId: string({
            required_error: "ticketId is required"
        })
    })
};

export const createTicketSchema = object({
    ...payload
});
export const createManyTicketsSchema = object({
    ...more_tickets_payload
});

export const updateTicketSchema = object({
    ...payload,
    ...params
});

export const deleteTicketSchema = object({
    ...params
});

export const getTicketSchema = object({
    ...params
});

export type CreateTicketInput = TypeOf<typeof createTicketSchema>;
export type CreateManyTicketsInput = TypeOf<typeof createManyTicketsSchema>;
export type UpdateTicketInput = TypeOf<typeof updateTicketSchema>;
export type ReadTicketInput = TypeOf<typeof getTicketSchema>;
export type DeleteTicketInput = TypeOf<typeof deleteTicketSchema>;
