import { object, number, string, TypeOf } from "zod";

const payload = {
    body: object({
        email: string({ required_error: "Email is required" }),
        username: string({ required_error: "Name is required" }),
        phone: string({ required_error: "Phone is required" }),
        password: string({ required_error: "Password is required" }).min(6, "Password should be a minimum of 6 characters"),
        profile: string({ required_error: "Image is required" })
    })
};

const params = {
    params: object({
        adminId: string({ required_error: "adminId is required" })
    })
};

export const updateAdminSchema = object({
    ...payload,
    ...params
});

export const deleteAdminSchema = object({
    ...params
});

export const getAdminSchema = object({
    ...params
});

export type UpdateAdminInput = TypeOf<typeof updateAdminSchema>;
export type ReadAdminInput = TypeOf<typeof getAdminSchema>;
export type DeleteAdminInput = TypeOf<typeof deleteAdminSchema>;
