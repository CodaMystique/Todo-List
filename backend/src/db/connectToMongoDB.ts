import mongoose from "mongoose";

export default async function connectToMongoDB(): Promise<void> {
  try {
    await mongoose.connect(process.env.MONGO_DB_URI, {
      dbName: "Todo-List",
    });

    console.log("Connected to MongoDB");
  } catch (err) {
    console.log(
      "Error while connecting to mongodb in connectToMongoDB: ",
      err.message
    );
  }
}
