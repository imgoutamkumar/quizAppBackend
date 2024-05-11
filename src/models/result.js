const mongoose = require("mongoose");

const resultSchema = new mongoose.Schema({
  quizId: {
    type: mongoose.Types.ObjectId,
  },
  userId: {
    type: mongoose.Types.ObjectId,
  },
  submitted_answers: [{ type: String, required: true }],
  score: {
    type: Number,
  },
});

const Result = mongoose.model("result", resultSchema);
module.exports = Result;
