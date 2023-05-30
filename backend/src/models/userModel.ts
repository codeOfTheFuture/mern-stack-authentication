import mongoose, { Model, Schema } from "mongoose";

interface UserSchema {
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

const userSchema: Schema<UserSchema> = new mongoose.Schema(
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

const User: Model<UserSchema> = mongoose.model("User", userSchema);

export default User;
