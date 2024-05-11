const express = require("express");
const cors = require("cors");
const app = express();
const bodyParser = require("body-parser");

const mongoose = require("mongoose");
const Db = require("./config/db");
app.use(express.json());
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const authRoute = require("./routes/authRoute");
app.use("/user", authRoute);

const userRoute = require("./routes/userRoute");
app.use("/user", userRoute);

const quizRoute = require("./routes/quizRoute");
app.use("/quiz", quizRoute);

const examRoute = require("./routes/examRoute");
app.use("/exam", examRoute);

const resultRoute = require("./routes/resultRoute");
app.use("/result", resultRoute);

app.listen(4000, async () => {
  await Db.connectDb();
  console.log("Server Started");
});
