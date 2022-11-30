const express = require("express");
const { getUser, getUserById } = require("../controllers/user");
const router = express.Router();

router.get("/getUser/:token", getUser);
router.get("/find/:id", getUserById);

module.exports = router;
