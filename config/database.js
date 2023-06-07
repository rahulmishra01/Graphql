import mongoose from "mongoose";
import { MONGODB_URL } from "./index.js";

const ConnectDB = () => {
  mongoose
    .connect(MONGODB_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => {
      console.log("mongoDB connected");
    })
    .catch((err) => {
      console.log("somthing went wrong in mongoDB");
    });
};
export default ConnectDB;
