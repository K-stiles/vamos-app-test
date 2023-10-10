import express, { Request, Response, NextFunction } from "express";
const router = express.Router();

export const apiRoute = (req: Request, res: Response, next: NextFunction) => {
    res.render("index", { title: "HOME" });
};

export const notfound = (req: Request, res: Response, next: NextFunction) => {
    res.status(404).render("404", { title: "PAGE NOT FOUND" });
};

export default router;
