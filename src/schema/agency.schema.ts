import { object, number, string, TypeOf, date, array } from "zod";

const payload = {
    body: object({
        name: string({
            required_error: "Name is required"
        }),
        contact: string().array()
    })
};

const params = {
    params: object({
        agencyId: string({
            required_error: "agencyId is required"
        })
    })
};

export const createAgencySchema = object({
    ...payload
});

export const updateAgencySchema = object({
    ...payload,
    ...params
});

export const deleteAgencySchema = object({
    ...params
});

export const getAgencySchema = object({
    ...params
});

export type CreateAgencyInput = TypeOf<typeof createAgencySchema>;
export type UpdateAgencyInput = TypeOf<typeof updateAgencySchema>;
export type ReadAgencyInput = TypeOf<typeof getAgencySchema>;
export type DeleteAgencyInput = TypeOf<typeof deleteAgencySchema>;
