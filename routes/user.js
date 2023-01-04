const express = require("express");
const { getUser, getUserById, profileImage } = require("../controllers/user");
const router = express.Router();

router.get("/getUser/:token", getUser);
router.get("/find/:id", getUserById);
router.post("/profile-pic/:id", profileImage);

module.exports = router;
