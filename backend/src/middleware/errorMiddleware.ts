import { NextFunction, Request, Response } from "express";

const notFound = (req: Request, res: Response, next: NextFunction): void => {
	const error: Error = new Error(`Not Found - ${req.originalUrl}`);
	res.status(404);
	next(error);
};

const errorHandler = (error: any, req: Request, res: Response, next: NextFunction): void => {
	let statusCode: number;
	let message: string;

	if (error.name === "CastError" && error.kind === "ObjectId") {
		statusCode = 404;
		message = "Resource not found";
	}

	if (res.statusCode === 200) {
		statusCode = 500;
	} else {
		statusCode = res.statusCode;
	}

	message = error.message;

	res.status(statusCode).json({
		message,
		stack: process.env.NODE_ENV === "production" ? null : error.stack,
	});
};

export { notFound, errorHandler };
