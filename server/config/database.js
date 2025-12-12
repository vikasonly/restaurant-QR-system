import mongoose from "mongoose";

const dbConnect = async () => {
  try {
    await mongoose.connect(
      "mongodb+srv://vikaskirdoliya2004_db_user:f4JjyT4QvxrMVjeN@cluster0.09rh6qb.mongodb.net/restaurant-qr"
    );
    console.log("MongoDB Connected Successfully");
  } catch (error) {
    console.error("MongoDB Connection Failed:", error.message);
  }
};

export default dbConnect;
