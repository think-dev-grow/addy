const express = require("express");

const { createDillaWallet } = require("../controllers/dillaWallet");

const router = express.Router();

router.post("/create-account", createDillaWallet);

module.exports = router;
