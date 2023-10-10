import { Request, Response, NextFunction } from "express";

import logger from "../library/logger";

const useListener = (NAMESPACE: string) => (req: Request, res: Response, next: NextFunction) => {
    logger.info(NAMESPACE, `INCOMING -> METHOD: [${req.method}] - URL: [${req.url}] - IP: [${req.socket.remoteAddress}]`);

    res.on("finish", () => {
        logger.info(NAMESPACE, `OUTGOING -> METHOD: [${req.method}] - URL: [${req.url}] - STATUS: [${res.statusCode}] - IP: [${req.socket.remoteAddress}]`);
    });

    next();
};

export default useListener;
