import mongoose from "mongoose";
import colors from "colors";

const connectDB = async () => {
  try {
    const connectToDb = await mongoose.connect(process.env.MONGO_URL);
    console.log(
      `Connected to MongoDB ${connectToDb.connection.host}`.bgGreen.black
    );
  } catch (error) {
    console.warn(`${error}`.bgRed.black);
  }
};

export default connectDB;
