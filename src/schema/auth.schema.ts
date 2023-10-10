import { object, string, TypeOf } from "zod";

export const createUserSchema = object({
    body: object({
        username: string({ required_error: "Name is required" }),
        phone: string({ required_error: "Phone is required" }),
        password: string({ required_error: "Password is required" }).min(6, "Password too short - should be 6 chars minimum")
    })
});

export const loginUserSchema = object({
    body: object({
        phone: string({ required_error: "Phone is required" }),
        password: string({ required_error: "Password is required" })
    })
});

export type CreateUserInput = TypeOf<typeof createUserSchema>;
export type loginUserInput = TypeOf<typeof loginUserSchema>;
