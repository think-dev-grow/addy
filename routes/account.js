const express = require("express");
const { createAccount } = require("../controllers/account");
const router = express.Router();

router.post("/create-account", createAccount);

module.exports = router;
