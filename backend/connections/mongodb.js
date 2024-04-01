import mongoose from "mongoose";
const url = "mongodb://localhost:27017/mentorpoint";

const connectToMongoDb = () => {
  mongoose
    .connect(url, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => {
      console.log("Mongodb connected successfully");
    })
    .catch((err) => {
      console.log(err);
    });
};
export default connectToMongoDb;