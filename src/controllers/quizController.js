const { query } = require("express");
const Quiz = require("../models/quiz");

const createQuiz = async (req, res) => {
  //const quiz = new Quiz(req.body);
  const created_by = req.userId;
  const { name, questions_list } = req.body;
  try {
    const quiz = await Quiz.create({
      name,
      questions_list,
      created_by,
    });
    res.send("quiz created");
  } catch (error) {
    console.log("error", error);
  }
};

const getQuizByCreatorId = async (req, res) => {
  if (req.userId === req.params.creatorId) {
    const quiz = await Quiz.findOne({ created_by: req.params.creatorId });
    return res.json(quiz);
  } else {
    res.send("something went wrong");
  }
};

const getQuizById = async (req, res) => {
  try {
    const quiz = await Quiz.findById(req.params.quizId);
    return res.json(quiz);
  } catch (error) {
    console.log(error);
  }
};

// replacing the existing content
const updateQuizById = async (req, res) => {
  try {
    const quiz = await Quiz.findOne({ _id: req.params.quizId });
    if (quiz) {
      if (req.userId === quiz.created_by.toString()) {
        quiz.name = req.body.name;
        quiz.questions_list = req.body.questions_list;

        await quiz.save();
        return res.json(quiz);
      } else {
        return res.send("your are not authorized");
      }
    } else {
      res.send("quiz not exist with this id");
    }
  } catch (error) {
    console.log(error);
  }
};

const deleteQuizById = async (req, res) => {
  try {
    const quizId = req.params.quizId;
    await Quiz.findByIdAndDelete(quizId);
    res.send("quiz deleted");
  } catch (error) {
    console.log(error);
  }
};

const publishQuizById = async (req, res) => {
  try {
    const quiz = await Quiz.findById(req.params.quizId);

    if (quiz) {
      if (req.userId === quiz.created_by.toString()) {
        quiz.is_published = true;
        await quiz.save();
        res.send("quiz published");
      } else {
        res.send("you are not authorized");
      }
    } else {
      res.send("quiz not exist");
    }
  } catch (error) {
    console.log(error);
  }
};

const getAllPublishedQuiz = async (req, res) => {
  try {
    const quizes = await Quiz.find({ is_published: true });
    res.send(quizes);
  } catch (error) {
    console.log("error");
  }
};

const getAllUnPublishedQuizesByCreatorId = async (req, res) => {
  try {
    const quizes = await Quiz.find({
      $and: [{ is_published: false }, { created_by: req.userId }],
    });
    res.send(quizes);
  } catch (error) {
    console.log("error");
  }
};

const getQuestionByindexNo = async (req, res) => {
  try {
    const quizId = req.params.quizId;
    let quiz = await Quiz.findById(quizId);
    if (quiz) {
      if (req.userId === quiz.created_by.toString()) {
        const index = req.params.index;

        try {
          if (index >= 0 && index < quiz.questions_list.length) {
            res.send(quiz.questions_list[index]);
          } else {
            console.log("something went wrong");
          }
        } catch (error) {
          console.log(error);
        }
      }
    }
  } catch (error) {
    console.log(error);
    res.send(error);
  }
};

const updateQuestionByindexNo = async (req, res) => {
  try {
    const quizId = req.params.quizId;
    let quiz = await Quiz.findById(quizId);
    if (quiz) {
      if (req.userId === quiz.created_by.toString()) {
        const index = req.params.index;
        const { question, options, answer } = req.body;
        try {
          if (index >= 0 && index < quiz.questions_list.length) {
            await Quiz.updateOne(
              { _id: req.params.quizId },
              {
                $set: {
                  [`questions_list.${index}`]: req.body,
                },
              }
            );

            await quiz.save();
            console.log(quiz.questions_list[index]);
            res.send("question updated");
          } else {
            console.log("something went wrong");
          }
        } catch (error) {
          console.log(error);
        }
      }
    }
  } catch (error) {
    console.log(error);
    res.send(error);
  }
};

const deleteQuestionByindexNo = async (req, res) => {
  try {
    const quizId = req.params.quizId;
    let quiz = await Quiz.findById(quizId);
    if (quiz) {
      if (req.userId === quiz.created_by.toString()) {
        const index = req.params.index;

        if (index >= 0 && index < quiz.questions_list.length) {
          await Quiz.findOneAndUpdate(
            { _id: req.params.quizId },
            {
              $unset: {
                [`questions_list.${index}`]: "",
              },
            }
          );
          await quiz.save();
          console.log("question deleted");
          res.send(quiz);
        } else {
          console.log("something went wrong");
        }
      }
    }
  } catch (error) {
    console.log(error);
    res.send(error);
  }
};

const filterAllPublishedQuiz = async (req, res) => {
  try {
    const quizes = await Quiz.find({
      $and: [{ is_published: true }, { created_by: req.userId }, req.query],
    });

    res.send(quizes);
  } catch (error) {
    console.log(error);
    res.status(400).send(error);
  }
};

const filterQuizes = async (req, res) => {
  console.log(req.query);
  try {
    const quizes = await Quiz.find({ is_published: req.query.is_published });
    return res.status(200).json(quizes);
  } catch (error) {
    return res.json(error);
  }
};

module.exports = {
  createQuiz,
  getQuizByCreatorId,
  getQuizById,
  updateQuizById,
  deleteQuizById,
  publishQuizById,
  getAllPublishedQuiz,
  getQuestionByindexNo,
  updateQuestionByindexNo,
  deleteQuestionByindexNo,
  getAllUnPublishedQuizesByCreatorId,
  filterAllPublishedQuiz,
};
