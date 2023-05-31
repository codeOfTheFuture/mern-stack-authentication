import { Request, Response } from "express";
import asyncHandler from "express-async-handler";
import generateToken from "../utils/generateToken";

import User, { UserType } from "../models/userModel.ts";

interface RequestBody {
	name: string;
	email: string;
	password: string;
}

// @desc    Auth user/set token
// route    POST /api/users/auth
// @access  Public
const authUser = asyncHandler(
	async (req: Request<null, null, RequestBody>, res: Response): Promise<void> => {
		const { email, password } = req.body;

		const user = await User.findOne({ email });

		if (user && (await user.matchPassword(password))) {
			generateToken(res, user._id.toString());

			res.status(201).json({
				_id: user._id,
				name: user.name,
				email: user.email,
			});
		} else {
			res.status(401);
			throw new Error("Invalid email or password");
		}
	}
);

// @desc    Register a new user
// route    POST /api/users
// @access  Public
const registerUser = asyncHandler(
	async (req: Request<null, null, RequestBody>, res: Response): Promise<void> => {
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
			});
		} else {
			res.status(400);
			throw new Error("Invalid user data");
		}
	}
);

// @desc    Logout user
// route    POST /api/users/logout
// @access  Public
const logoutUser = asyncHandler(async (req: Request, res: Response): Promise<void> => {
	res.cookie("jwt", "", {
		httpOnly: true,
		expires: new Date(0),
	});

	res.status(200).json({ message: "User logged out" });
});

interface UserProfileRequest extends Request {
	user?: UserType;
}

// @desc    Get user profile
// route    GET /api/users/profile
// @access  Private
const getUserProfile = asyncHandler(async (req: UserProfileRequest, res: Response) => {
	const { _id, name, email, createdAt, updatedAt } = req.user as UserType;
	const user: UserType = { _id, name, email, createdAt, updatedAt } as UserType;

	res.status(200).json(user);
});

// @desc    Update user profile
// route    PUT /api/users/profile
// @access  Private
const updateUserProfile = asyncHandler(async (req: Request, res: Response) => {
	res.status(200).json({ message: "Update user profile" });
});

export { authUser, registerUser, logoutUser, getUserProfile, updateUserProfile };
