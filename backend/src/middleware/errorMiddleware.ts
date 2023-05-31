import { NextFunction, Request, Response } from "express";

/**
 * Middleware for handling 404 errors (Not Found).
 *
 * @param {import('express').Request} req - The Express request object.
 * @param {import('express').Response} res - The Express response object.
 * @param {import('express').NextFunction} next - The Express next function.
 * @returns {void}
 */
const notFound = (req: Request, res: Response, next: NextFunction): void => {
	const error: Error = new Error(`Not Found - ${req.originalUrl}`);
	res.status(404);
	next(error);
};

/**
 * Error handler middleware for handling and sending error responses.
 *
 * @function errorHandler
 * @param {any} error - The error object.
 * @param {Request} req - The Express request object.
 * @param {Response} res - The Express response object.
 * @param {NextFunction} next - The next middleware function.
 * @returns {void}
 */
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
