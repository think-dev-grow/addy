const express = require("express");
const {
  getUser,
  // getUserById,
  profileImage,
  nextOfKin,
  uploadIdFront,
  uploadIdBack,
  uploadUtilityBill,
  // declineUtilityBill,
  // approveUtility,
  // declineIdFront,
  // approveIdFront,
  // declineIdBack,
  // approveIdBack,
  // genrateAccount,
} = require("../controllers/user");
const router = express.Router();

const { upload } = require("../utils/uploadFile");

const protect = require("../middlewares/authMiddleware");

// router.get("/getUser/:token", getUser);
// router.get("/find/:id", getUserById);
// router.post("/profile-pic/:id", upload.single("image"), profileImage);
// router.put("/next-of-kin/:id", nextOfKin);
// router.put("/decline-utility/:id", declineUtilityBill);
// router.put("/approve-utility/:id", approveUtility);
// router.put("/decline-front/:id", declineIdFront);
// router.put("/approve-front/:id", approveIdFront);
// router.put("/decline-back/:id", declineIdBack);
// router.put("/approve-back/:id", approveIdBack);
// router.put("/generate-san/:id", genrateAccount);
// router.post("/id-front/:id", upload.single("image"), uploadIdFront);
// router.post("/id-back/:id", upload.single("image"), uploadIdBack);
// router.post("/utility-bill/:id", upload.single("image"), uploadUtilityBill);

router.get("/get-user", protect, getUser);

router.post("/profile-pic", protect, upload.single("image"), profileImage);

router.put("/next-of-kin", protect, nextOfKin);

module.exports = router;
