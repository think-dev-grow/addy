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
  selectPin,
  wrongContact,
  mobileVeri,
  updateMobileVerification,
  addBVN,
} = require("../controllers/auth");

const verifyTokenMiddleware = require("../utils/verifyToken");

const router = express.Router();

router.post("/send-otp", sendOTP);

router.post("/verify-otp/:token/:id", verifyOTP);

router.post("/complete-profile/:id", completeProfile);

router.delete("/wrong-email/:id", wrongEmail);

router.put("/security-question/:id", securityQusetion);

router.put("/add-bvn/:id", addBVN);

router.post("/login", login);

router.post("/forgot-password", forgotPassword);

router.get("/reset-password/:token", verifyToken);

router.put("/user/reset-password/:id", resetPasswordAPI);

router.put("/logout/:token", verifyTokenMiddleware, logOut);

router.get("/answer-security-question/:token", answerSQ);

router.get("/refresh-token/:token", refreshToken);

router.post("/set-transaction-pin/:id", selectPin);

router.put("/wrong-contact/:id", wrongContact);

router.put("/mobile/:id", mobileVeri);

router.get("/mobile-status-update/:id", updateMobileVerification);

module.exports = router;
