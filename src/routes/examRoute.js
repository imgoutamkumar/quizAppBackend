const express = require("express");
const router = express.Router();
const examController = require("../controllers/examController");
const AuthMiddleware = require("../middlewares/authMiddleware");

router.get(
  "/:quizId",
  AuthMiddleware.isAuthenticated,
  examController.startExam
);
router.post("/", AuthMiddleware.isAuthenticated, examController.submitExam);

module.exports = router;
