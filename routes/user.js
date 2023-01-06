const express = require("express");
const { getUser, getUserById, profileImage } = require("../controllers/user");
const router = express.Router();

const { upload } = require("../utils/uploadFile");

router.get("/getUser/:token", getUser);
router.get("/find/:id", getUserById);
router.post("/profile-pic", upload.single("image"), profileImage);

module.exports = router;
