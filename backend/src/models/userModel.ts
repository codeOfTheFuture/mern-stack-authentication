import mongoose, { CallbackWithoutResultAndOptionalError, Model, Schema } from "mongoose";
import bcrypt from "bcryptjs";

export interface User {
	name: string;
	email: string;
	password: string;
}

export interface UserSchema {
	name: {
		type: StringConstructor;
		required: true;
	};
	email: {
		type: StringConstructor;
		required: true;
		unique: true;
	};
	password: {
		type: StringConstructor;
		required: true;
	};
}

const userSchema: Schema<User, Model<UserSchema>> = new mongoose.Schema(
	{
		name: {
			type: String,
			required: true,
		},
		email: {
			type: String,
			required: true,
			unique: true,
		},
		password: {
			type: String,
			required: true,
		},
	},
	{
		timestamps: true,
	}
);

userSchema.pre("save", async function (next: CallbackWithoutResultAndOptionalError) {
	if (!this.isModified("password")) {
		next();
	}

	const salt: string = await bcrypt.genSalt();
	this.password = await bcrypt.hash(this.password, salt);
});

const User: Model<User> = mongoose.model("User", userSchema);

export default User;
