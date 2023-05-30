import mongoose from "mongoose";

const connectDB = async () => {
  try {
    const connection = await mongoose.connect(
      process.env.MONGODB_URI as string,
      {
        dbName: "Proshop",
      }
    );

    console.log(`MongoDB connected: ${connection.connection.host}`);
  } catch (error) {
    if (typeof error === "string") {
      console.log(`Error: ${error}`);
    } else if (error instanceof Error) {
      console.error(`Error: ${error.message}`);
    }
    process.exit(1);
  }
};

export default connectDB;
