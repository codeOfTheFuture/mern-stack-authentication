import { Request, Response } from "express";
import asyncHandler from "express-async-handler";
import generateToken from "../utils/generateToken";

import User, { UserType } from "../models/userModel.ts";

interface ReqBody {
	name: string;
	email: string;
	password: string;
}

// @desc    Auth user/set token
// route    POST /api/users/auth
// @access  Public
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

interface UserProfileRequest<ReqBody = any> extends Request {
	user?: UserType;
	body: ReqBody;
}

// @desc    Get user profile
// route    GET /api/users/profile
// @access  Private
const getUserProfile = asyncHandler(
	async (req: UserProfileRequest<ReqBody>, res: Response): Promise<void> => {
		res.status(200).json(req.user);
	}
);

// @desc    Update user profile
// route    PUT /api/users/profile
// @access  Private
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
