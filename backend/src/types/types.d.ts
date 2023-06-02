import { Date, ObjectId } from "mongoose";

/**
 * User document interface.
 *
 * @interface User
 * @property {_id} _id - The user's ID.
 * @property {string} name - The user's name.
 * @property {string} email - The user's email.
 * @property {string} password - The user's password.
 * @property {Date} createdAt - The date and time when the user was created.
 * @property {Date} updatedAt - The date and time when the user was last updated.
 */
interface User {
	_id: ObjectId;
	name: string;
	email: string;
	password: string;
	createdAt: Date;
	updatedAt: Date;
}

/**
 * User schema definition.
 *
 * @interface UserSchema
 * @property {object} name - The name field configuration.
 * @property {StringConstructor} name.type - The name field type.
 * @property {boolean} name.required - Specifies if the name field is required.
 * @property {object} email - The email field configuration.
 * @property {StringConstructor} email.type - The email field type.
 * @property {boolean} email.required - Specifies if the email field is required.
 * @property {boolean} email.unique - Specifies if the email field should be unique.
 * @property {object} password - The password field configuration.
 * @property {StringConstructor} password.type - The password field type.
 * @property {boolean} password.required - Specifies if the password field is required.
 */
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

/**
 * Schema methods interface for the user schema.
 *
 * @interface SchemaMethods
 * @property {Function} matchPassword - Method to compare entered password with the user's hashed password.
 * @param {string} enteredPassword - The entered password to compare.
 * @returns {Promise<boolean>} - A promise that resolves to `true` if the passwords match, or `false` otherwise.
 */
interface SchemaMethods {
	matchPassword: (enteredPassword: string) => Promise<boolean>;
}
