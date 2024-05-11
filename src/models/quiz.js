const mongoose = require("mongoose");

const quizSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    imageUrl: {
      type: String,
      default:
        "https://www.shutterstock.com/shutterstock/photos/1844920264/display_1500/stock-vector-coding-programming-software-creating-symbol-isolated-flat-vector-pictogram-of-developer-code-1844920264.jpg",
    },
    questions_list: [
      {
        question: {
          type: String,
          required: true,
        },
        options: [
          String,
          // {
          //   type: String,
          //   required: true,
          // },
        ],
        answer: {
          type: Number,
          //required: true,
        },
      },
    ],

    created_by: {
      type: mongoose.Types.ObjectId,
    },
    is_published: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

const Quiz = mongoose.model("quiz", quizSchema);
module.exports = Quiz;
