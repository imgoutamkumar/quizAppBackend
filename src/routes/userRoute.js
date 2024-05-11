const UserController = require("../controllers/userController");
const express = require("express");
const router = express.Router();
const AuthMiddleware = require("../middlewares/authMiddleware");

router.get("/", UserController.getAllUsers);
router.get(
  "/id/:userId",
  AuthMiddleware.isAuthenticated,
  UserController.getUserById
);
router.put("/id/:quizId", UserController.updateUser);

module.exports = router;
