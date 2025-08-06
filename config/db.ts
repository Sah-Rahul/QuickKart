import serverCatchError from "@/utility/server-catch-error";
import mongoose from "mongoose";

const ConnectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI!);
        console.log(`MongoDB connected: ${conn.connection.host}`);
    } catch (error) {
        serverCatchError(error);
        process.exit(1);  
    }
};

export default ConnectDB;
