import { NextFunction, Request, Response } from "express";

export const errorBuilder = (error: any, req: Request, res: Response, next: NextFunction) => {
    const errorStatus: number = error.status || 500;
    const errorMessage: string = error.message || "Internal Server Error!";
    return res.status(errorStatus).json({
        error: true,
        status: errorStatus,
        message: errorMessage,
        stack: error.stack
    });
};
