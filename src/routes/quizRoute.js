const express = require("express");
const router = express.Router();
const quizController = require("../controllers/quizController");
const AuthMiddleware = require("../middlewares/authMiddleware");

router.post(
  "/",
  AuthMiddleware.isAuthenticated,
  AuthMiddleware.isRoleAdmin,
  quizController.createQuiz
);
router.get(
  "/id/:creatorId",
  AuthMiddleware.isAuthenticated,
  AuthMiddleware.isRoleAdmin,
  quizController.getQuizByCreatorId
);
router.get(
  "/quizId/:quizId",
  AuthMiddleware.isAuthenticated,
  AuthMiddleware.isRoleAdmin,
  quizController.getQuizById
);
router.put(
  "/update/:quizId",
  AuthMiddleware.isAuthenticated,
  AuthMiddleware.isRoleAdmin,
  quizController.updateQuizById
);

router.delete(
  "/delete/:quizId",
  AuthMiddleware.isAuthenticated,
  AuthMiddleware.isRoleAdmin,
  quizController.deleteQuizById
);

router.patch(
  "/publish/:quizId",
  AuthMiddleware.isAuthenticated,
  AuthMiddleware.isRoleAdmin,
  quizController.publishQuizById
);

router.get(
  "/get/:quizId/:index",
  AuthMiddleware.isAuthenticated,
  AuthMiddleware.isRoleAdmin,
  quizController.getQuestionByindexNo
);

router.put(
  "/update/:quizId/:index",
  AuthMiddleware.isAuthenticated,
  AuthMiddleware.isRoleAdmin,
  quizController.updateQuestionByindexNo
);

router.delete(
  "/delete/:quizId/:index",
  AuthMiddleware.isAuthenticated,
  AuthMiddleware.isRoleAdmin,
  quizController.deleteQuestionByindexNo
);

router.get("/allQuiz", quizController.getAllPublishedQuiz);
router.get(
  "/unPublishedQuiz",
  AuthMiddleware.isAuthenticated,
  AuthMiddleware.isRoleAdmin,
  quizController.getAllUnPublishedQuizesByCreatorId
);
router.get(
  "/filter",
  AuthMiddleware.isAuthenticated,
  AuthMiddleware.isRoleAdmin,
  quizController.filterAllPublishedQuiz
);

module.exports = router;
