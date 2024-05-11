const express = require("express");
const router = express.Router();
const resultController = require("../controllers/resultContainer");
const AuthMiddleware = require("../middlewares/authMiddleware");
router.get(
  "/:resultId",
  AuthMiddleware.isAuthenticated,
  resultController.getResult
);

module.exports = router;
