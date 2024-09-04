import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config(); // Load environment variables

const DbConn = async () => {
  try {
    await mongoose.connect("mongodb+srv://amalfrancis744:HMAjYGpMdYBxYraG@cluster0.37pixic.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0", {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Database Connected Successfully");
  } catch (error) {
    console.log(error);
  }
};

export default DbConn;