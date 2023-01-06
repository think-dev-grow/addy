const express = require("express");
const {
  getUser,
  getUserById,
  profileImage,
  nextOfKin,
} = require("../controllers/user");
const router = express.Router();

const { upload } = require("../utils/uploadFile");

router.get("/getUser/:token", getUser);
router.get("/find/:id", getUserById);
router.post("/profile-pic/:id", upload.single("image"), profileImage);
router.put("/next-of-kin/:id", nextOfKin);

module.exports = router;
