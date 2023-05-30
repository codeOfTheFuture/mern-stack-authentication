import mongoose from "mongoose";
import colors from "colors";

const MONGO_URI: string = process.env.MONGO_URI as string;

const connectDB = async (): Promise<void> => {
	try {
		const connect = await mongoose.connect(MONGO_URI);
		console.log(colors.magenta(`[database] MongoDB Connected: ${connect.connection.host}`));
	} catch (error: any) {
		console.error(colors.red(`Error: ${error.message}`));
		process.exit(1);
	}
};

export default connectDB;
