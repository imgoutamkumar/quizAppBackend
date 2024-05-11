const mongoose = require("mongoose");

const mongodbUrl =
  // "mongodb+srv://admin:admin123@cluster0.fayn6vz.mongodb.net/quizDB?retryWrites=true&w=majority";
  "mongodb+srv://admin:admin123@quizcluster.fjz2row.mongodb.net/quizDB?retryWrites=true&w=majority";

const connectDb = () => {
  return mongoose
    .connect(mongodbUrl)
    .then(() => {
      console.log("Database Connected");
    })
    .catch((error) => console.log(error));
};

module.exports = { connectDb };
