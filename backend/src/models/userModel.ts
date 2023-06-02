import mongoose, { CallbackWithoutResultAndOptionalError, Model, Schema } from "mongoose";
import bcrypt from "bcryptjs";
import { SchemaMethods, User, UserSchema } from "../types/types";

/**
 * User mongoose schema.
 *
 * @typedef {import('mongoose').Schema} UserSchema
 * @property {string} name - The name of the user.
 * @property {string} email - The email of the user.
 * @property {string} password - The hashed password of the user.
 * @property {Date} createdAt - The creation date of the user.
 * @property {Date} updatedAt - The last update date of the user.
 */
const userSchema: Schema<User, Model<UserSchema>, SchemaMethods> = new mongoose.Schema(
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

/**
 * Pre-save middleware that hashes the user's password if modified.
 *
 * @callback PreSaveMiddleware
 * @param {CallbackWithoutResultAndOptionalError} next - The callback function to proceed to the next middleware.
 */
userSchema.pre("save", async function (next: CallbackWithoutResultAndOptionalError) {
	if (!this.isModified("password")) {
		next();
	}

	const salt: string = await bcrypt.genSalt();
	this.password = await bcrypt.hash(this.password, salt);
});

/**
 * Method to compare entered password with the user's hashed password.
 *
 * @callback MatchPasswordMethod
 * @param {string} enteredPassword - The entered password to compare.
 * @returns {Promise<boolean>} - A promise that resolves to `true` if the passwords match, or `false` otherwise.
 */
userSchema.methods.matchPassword = async function (enteredPassword: string) {
	return await bcrypt.compare(enteredPassword, this.password);
};

/**
 * User model.
 *
 * @type {Model<User, {}, SchemaMethods>}
 */
const User: Model<User, {}, SchemaMethods> = mongoose.model("User", userSchema);

export default User;
