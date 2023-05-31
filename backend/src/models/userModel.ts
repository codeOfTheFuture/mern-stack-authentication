import mongoose, { CallbackWithoutResultAndOptionalError, Model, ObjectId, Schema } from "mongoose";
import bcrypt from "bcryptjs";

export interface UserType {
	_id: ObjectId;
	name: string;
	email: string;
	password: string;
	createdAt: Date;
	updatedAt: Date;
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

export interface SchemaMethods {
	matchPassword: (enteredPassword: string) => Promise<boolean>;
}

const userSchema: Schema<UserType, Model<UserSchema>, SchemaMethods> = new mongoose.Schema(
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

userSchema.methods.matchPassword = async function (enteredPassword: string) {
	return await bcrypt.compare(enteredPassword, this.password);
};

const User: Model<UserType, {}, SchemaMethods> = mongoose.model("User", userSchema);

export default User;
