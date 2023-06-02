import { Request, Response } from "express";
import asyncHandler from "express-async-handler";
import generateToken from "../utils/generateToken";
import { User as UserType } from "../types/types";

import User from "../models/userModel.ts";

/**
 * Request body interface for user data.
 *
 * @interface ReqBody
 * @property {string} name - The name of the user.
 * @property {string} email - The email of the user.
 * @property {string} password - The password of the user.
 */
interface ReqBody {
	name: string;
	email: string;
	password: string;
}

/**
 * Authenticate user and set token.
 *
 *  - Route - POST /api/user/auth
 * @access Public
 *
 * @function authUser
 * @param {Request<null, null, ReqBody>} req - The Express request object.
 * @param {Response} res - The Express response object.
 * @returns {Promise<void>}
 * @throws {Error} If the email or password is invalid.
 */
const authUser = asyncHandler(
	async (req: Request<null, null, ReqBody>, res: Response): Promise<void> => {
		const { email, password } = req.body;

		const user = await User.findOne({ email });

		if (user && (await user.matchPassword(password))) {
			generateToken(res, user._id.toString());

			res.status(201).json({
				_id: user._id,
				name: user.name,
				email: user.email,
				createdAt: user.createdAt,
				updatedAt: user.updatedAt,
			});
		} else {
			res.status(401);
			throw new Error("Invalid email or password");
		}
	}
);

/**
 * Register a new user.
 *
 * - Route - POST /api/users
 * @access Public
 *
 * @function registerUser
 * @param {Request<null, null, ReqBody>} req - The Express request object.
 * @param {Response} res - The Express response object.
 * @returns {Promise<void>}
 * @throws {Error} If the user already exists or the user data is invalid.
 */
const registerUser = asyncHandler(
	async (req: Request<null, null, ReqBody>, res: Response): Promise<void> => {
		const { name, email, password } = req.body;

		const userInDatabase = await User.findOne({ email });

		if (userInDatabase) {
			res.status(400);
			throw new Error("User already exists");
		}

		const user = await User.create({
			name,
			email,
			password,
		});

		if (user) {
			generateToken(res, user._id.toString());

			res.status(201).json({
				_id: user._id,
				name: user.name,
				email: user.email,
				createdAt: user.createdAt,
				updatedAt: user.updatedAt,
			});
		} else {
			res.status(400);
			throw new Error("Invalid user data");
		}
	}
);

/**
 * Logout the user.
 *
 * - Route - POST /api/user/logout
 * @access Public
 *
 * @function logoutUser
 * @param {Request} req - The Express request object.
 * @param {Response} res - The Express response object.
 * @returns {Promise<void>}
 */
const logoutUser = asyncHandler(async (req: Request, res: Response): Promise<void> => {
	res.cookie("jwt", "", {
		httpOnly: true,
		expires: new Date(0),
	});

	res.status(200).json({ message: "User logged out" });
});

/**
 * Extended request object for user profile requests.
 *
 * @interface UserProfileRequest
 * @extends Request
 * @template ReqBody - The type of the request body.
 * @property {UserType} user - The user object.
 * @property {ReqBody} body - The request body.
 */
interface UserProfileRequest<ReqBody = any> extends Request {
	user?: UserType;
	body: ReqBody;
}

/**
 * Get user profile.
 *
 * - Route - GET /api/users/profile
 * @access Private
 *
 * @function getUserProfile
 * @param {UserProfileRequest<ReqBody>} req - The Express request object.
 * @param {Response} res - The Express response object.
 * @returns {Promise<void>}
 */
const getUserProfile = asyncHandler(
	async (req: UserProfileRequest<ReqBody>, res: Response): Promise<void> => {
		res.status(200).json(req.user);
	}
);

/**
 * Update user profile.
 *
 * - Route - PUT /api/users/profile
 * @access Private
 *
 * @function updateUserProfile
 * @param {UserProfileRequest<ReqBody>} req - The Express request object.
 * @param {Response} res - The Express response object.
 * @returns {Promise<void>}
 */
const updateUserProfile = asyncHandler(
	async (req: UserProfileRequest<ReqBody>, res: Response): Promise<void> => {
		const user = await User.findById(req.user?._id);

		if (user) {
			user.name = req.body.name || user.name;
			user.email = req.body.email || user.email;

			if (req.body.password) {
				user.password = req.body.password;
			}

			const updatedUser = await user.save();

			res.status(200).json({
				_id: updatedUser._id,
				name: updatedUser.name,
				email: updatedUser.email,
				createdAt: updatedUser.createdAt,
				updatedAt: updatedUser.updatedAt,
			});
		} else {
			res.status(404);
			throw new Error("User not found");
		}
	}
);

export { authUser, registerUser, logoutUser, getUserProfile, updateUserProfile };
