const express = require("express");
const {
  sendOTP,
  verifyOTP,
  wrongEmail,
  completeProfile,
  securityQusetion,
  addBVN,
  answerSQ,
  wrongContact,
  logOut,
  Login,
  setPin,
  mobileVerification,
  updateMobileVerification,
  loginStatus,
  forgotPassword,
  resetPassword,
} = require("../controllers/authy");
const router = express.Router();

const protect = require("../middlewares/authMiddleware");

router.post("/send-otp", sendOTP);

router.post("/verify-otp", protect, verifyOTP);

router.delete("/wrong-email", protect, wrongEmail);

router.put("/complete-profile", protect, completeProfile);

router.put("/security-question", protect, securityQusetion);

router.post("/answer-question", protect, answerSQ);

router.put("/add-bvn", protect, addBVN);

router.put("/set-pin", protect, setPin);

router.put("/mobile-otp", protect, mobileVerification);

router.get("/mobile-otp-2", protect, updateMobileVerification);

router.put("/wrong-contact", protect, wrongContact);

router.post("/login", Login);

router.get("/logout", logOut);

router.get("/login-status", loginStatus);

router.post("/forgot-password", forgotPassword);

module.exports = router;
