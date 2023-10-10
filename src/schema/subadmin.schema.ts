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
        subAdminId: string({ required_error: "subAdminId is required" })
    })
};

export const updateSubAdminSchema = object({
    ...payload,
    ...params
});

export const deleteSubAdminSchema = object({
    ...params
});

export const getSubAdminSchema = object({
    ...params
});

export type UpdateSubAdminInput = TypeOf<typeof updateSubAdminSchema>;
export type ReadSubAdminInput = TypeOf<typeof getSubAdminSchema>;
export type DeleteSubAdminInput = TypeOf<typeof deleteSubAdminSchema>;
