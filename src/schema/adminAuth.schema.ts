import { object, string, TypeOf } from "zod";

export const createAdminSchema = object({
    body: object({
        email: string({ required_error: "Email is required" }),
        username: string({ required_error: "Name is required" }),
        phone: string({ required_error: "Phone is required" }),
        password: string({ required_error: "Password is required" }).min(6, "Password too short - should be 6 chars minimum")
    })
});

export const loginAdminSchema = object({
    body: object({
        email: string({ required_error: "Email is required" }),
        password: string({ required_error: "Password is required" })
    })
});

export type CreateAdminInput = TypeOf<typeof createAdminSchema>;
export type loginAdminInput = TypeOf<typeof loginAdminSchema>;
