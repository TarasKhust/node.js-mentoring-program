import { NextFunction, Request, Response } from 'express';
import logger from '../lib/logger';

export const errorHandler = (req: Request, message: any): void => {
	const log = `method: ${req.method} Params: ${JSON.stringify(req.params)} message: ${message}`;

	logger.error(log);
};

export default errorHandler;
