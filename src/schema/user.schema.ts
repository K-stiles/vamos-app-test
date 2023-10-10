import { object, number, string, TypeOf } from "zod";

const payload = {
    body: object({
        username: string({ required_error: "Name is required" }),
        phone: string({ required_error: "Phone is required" }),
        password: string({ required_error: "Password is required" }).min(6, "Password should be a minimum of 6 characters"),
        profile: string({ required_error: "Image is required" })
    })
};

const params = {
    params: object({
        userId: string({ required_error: "userId is required" })
    })
};

export const updateUserSchema = object({
    ...payload,
    ...params
});

export const deleteUserSchema = object({
    ...params
});

export const getUserSchema = object({
    ...params
});

export type UpdateUserInput = TypeOf<typeof updateUserSchema>;
export type ReadUserInput = TypeOf<typeof getUserSchema>;
export type DeleteUserInput = TypeOf<typeof deleteUserSchema>;
