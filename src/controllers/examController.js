const Quiz = require("../models/quiz");
const Result = require("../models/result");
const startExam = async (req, res) => {
  try {
    const quiz = await Quiz.findById(req.params.quizId);
    if (!quiz) {
      res.send("quiz not exist");
    }
    if (!quiz.is_published) {
      res.send("quiz is not published ");
    }
    res.send(quiz);
  } catch (error) {
    console.log(error);
  }
};

const submitExam = async (req, res) => {
  try {
    const quizId = req.body.quizId;
    const userId = req.userId;
    const submitted_answers = req.body.submitted_answers;
    const quiz = await Quiz.findById(quizId);
    let score = 0;
    //const object_keys = Object.keys(quiz.questions_list[1].options);
    const total_questions = Object.keys(quiz.questions_list).length;
    for (let i = 0; i < total_questions; i++) {
      if (submitted_answers[i] === quiz.questions_list[i].answer) {
        score = score + 1;
      }
    }
    const result = await Result.create({
      quizId,
      userId,
      submitted_answers,
      score,
    });
    res.send(result);
  } catch (error) {
    console.log(error);
  }
};

module.exports = { startExam, submitExam };
