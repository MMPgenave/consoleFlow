import mongoose from "mongoose";

let isConnected: boolean = false;
export const connectToDataBase = async () => {
  mongoose.set("strictQuery", true);
  if (!process.env.MONGODB_URL) {
    return console.log("missing mongodb_url");
  }
  if (isConnected) {
    return console.log("Mongodb is already connected.");
  }
  try {
    await mongoose.connect(process.env.MONGODB_URL, { dbName: "ConsoleFlow" });
    isConnected = true;
    console.log("mogodb connected with MMP coding skills!");
  } catch (error) {
    console.log(error);
  }
};
