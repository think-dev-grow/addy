const express = require("express");

const {
  sendOTP,
  verifyOTP,
  completeProfile,
  wrongEmail,
  securityQusetion,
  login,
  forgotPassword,
  verifyToken,
  resetPasswordAPI,
  logOut,
  answerSQ,
  refreshToken,
} = require("../controllers/auth");

const verifyTokenMiddleware = require("../utils/verifyToken");

const router = express.Router();

router.post("/send-otp", sendOTP);

router.post("/verify-otp/:token/:id", verifyOTP);

router.post("/complete-profile/:id", completeProfile);

router.delete("/wrong-email/:id", wrongEmail);

router.put("/security-question/:id", securityQusetion);

router.post("/login", login);

router.post("/forgot-password", forgotPassword);

router.get("/reset-password/:token", verifyToken);

router.put("/user/reset-password/:id", resetPasswordAPI);

router.put("/logout/:token", verifyTokenMiddleware, logOut);

router.get("/answer-security-question/:token", answerSQ);

router.get("/refresh-token/:token", refreshToken);

module.exports = router;
