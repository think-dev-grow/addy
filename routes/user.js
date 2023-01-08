const express = require("express");
const {
  getUser,
  getUserById,
  profileImage,
  nextOfKin,
  uploadIdFront,
  uploadIdBack,
  uploadUtilityBill,
  decline,
  approve,
} = require("../controllers/user");
const router = express.Router();

const { upload } = require("../utils/uploadFile");

router.get("/getUser/:token", getUser);
router.get("/find/:id", getUserById);
router.post("/profile-pic/:id", upload.single("image"), profileImage);
router.put("/next-of-kin/:id", nextOfKin);
router.put("/decline/:id", decline);
router.put("/approve/:id", approve);
router.post("/id-front/:id", upload.single("image"), uploadIdFront);
router.post("/id-back/:id", upload.single("image"), uploadIdBack);
router.post("/utility-bill/:id", upload.single("image"), uploadUtilityBill);

module.exports = router;
