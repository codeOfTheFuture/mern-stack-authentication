import { Response } from "express";
import jwt from "jsonwebtoken";

const JWT_SECRET: string = process.env.JWT_SECRET as string;
const NODE_ENV: string = process.env.NODE_ENV as string;
const NOT_IN_DEVELOPMENT: boolean = NODE_ENV !== "development";
const THIRTY_DAYS_MILLISECONDS: number = 30 * 24 * 60 * 60 * 1000;

/**
 * Generates a JWT token and sets it as a cookie in the response.
 *
 * @param {Response} res - The Express response object.
 * @param {string} userId - The user ID for which the token is generated.
 * @returns {void}
 */
const generateToken = (res: Response, userId: string): void => {
	const token: string = jwt.sign({ userId }, JWT_SECRET, {
		expiresIn: "30d",
	});

	res.cookie("jwt", token, {
		httpOnly: true,
		secure: NOT_IN_DEVELOPMENT,
		sameSite: "strict",
		maxAge: THIRTY_DAYS_MILLISECONDS,
	});
};

export default generateToken;
