const express = require("express");
const { createAccount } = require("../controllers/account");
const router = express.Router();

router.get("/create-account", createAccount);

module.exports = router;
