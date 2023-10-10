import { Request, Response, NextFunction } from "express";

import { createPayment, disablePayment, modifyPayment, readPayment, readallPayments } from "../services/payment.service";
import { CreatePaymentInput, ReadPaymentInput, UpdatePaymentInput } from "../schema/payment.schema";
import { parentError } from "../functions/error";

/** create Payment */
export async function addPayment(req: Request<{}, {}, CreatePaymentInput["body"]>, res: Response) {
    // const userId = res.locals.user._id;

    const body = req.body;

    const payment = await createPayment({ ...body });

    return res.send(payment);
}

/** get all Payment */
export const getPayment = async (req: Request<ReadPaymentInput["params"]>, res: Response, next: NextFunction) => {
    const paymentId = req.params?.paymentId;
    try {
        const payment = await readPayment({ _id: paymentId });
        if (!payment) {
            throw parentError(404, "Requested payment information was not found");
        }
        res.status(200).json(payment);
    } catch (error) {
        next(error);
    }
};

/** get Payment  */
export const getPayments = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const payments = await readallPayments({});
        if (!payments) {
            throw parentError(404, "No Payment Data was found");
        }
        res.status(200).json(payments);
    } catch (error) {
        next(error);
    }
};

/**  Update Payment */
export const updatePayment = async (req: Request<UpdatePaymentInput["params"]>, res: Response, next: NextFunction) => {
    try {
        const paymentId = req.params?.paymentId;
        const update = req.body;

        const payment = await readPayment({ _id: paymentId });

        if (!payment) {
            throw parentError(404, "Requested payment information was not found");
        }

        const updatedPayment = await modifyPayment({ _id: paymentId }, update, {
            new: true
        });

        return res.status(200).json(updatedPayment);
    } catch (error) {
        next(error);
    }
};

/** Delete Payment */
export const deletePayment = async (req: Request<UpdatePaymentInput["params"]>, res: Response, next: NextFunction) => {
    const paymentId = req.params.paymentId;
    try {
        // const payment = await readPayment({ paymentId });
        // if (!payment) {
        //     return parentError(404, "Requested account information was not found");
        // }

        await disablePayment({ _id: paymentId });
        res.status(200).json("Payment successfully deleted");
    } catch (error) {
        next(error);
    }
};
