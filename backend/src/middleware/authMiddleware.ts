import { NextFunction, Request, Response } from "express";
import { Document, ObjectId } from "mongoose";
import jwt, { JwtPayload } from "jsonwebtoken";
import asyncHandler from "express-async-handler";
import { User as UserType, SchemaMethods } from "../types/types";

import User from "../models/userModel";

const JWT_SECRET: string = process.env.JWT_SECRET as string;

/**
 * Extended request object that includes the user property and cookies.
 *
 * @interface AuthRequest
 * @extends Request
 * @property {UserType} user - The user object.
 * @property {{ jwt: string | null }} cookies - The cookies object.
 */
interface AuthRequest extends Request {
	user?:
		| (Document<unknown, {}, UserType> &
				Omit<UserType & Required<{ _id: ObjectId }>, "matchPassword"> &
				SchemaMethods)
		| null;
	cookies: { jwt: string | null };
}

/**
 * Middleware that protects routes by verifying and decoding JWT token.
 *
 * @param {AuthRequest} req - The Express request object.
 * @param {Response} res - The Express response object.
 * @param {NextFunction} next - The next middleware function.
 * @returns {Promise<void>}
 */
const protect = asyncHandler(
	async (req: AuthRequest, res: Response, next: NextFunction): Promise<void> => {
		let token: string | null;

		token = req.cookies.jwt;

		if (token) {
			try {
				const decoded: JwtPayload = jwt.verify(token, JWT_SECRET) as JwtPayload;
				const userId: string = decoded.userId as string;

				req.user = await User.findById(userId).select(["-password", "-__v"]);

				next();
			} catch (error: any) {
				res.status(401);
				throw new Error("Not authorized: invalid token");
			}
		} else {
			res.status(401);
			throw new Error("Not authorized: no token");
		}
	}
);

export { protect };
