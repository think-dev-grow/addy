const express = require("express");

const {
  createDillaWallet,
  topUp,
  transferMoney,
} = require("../controllers/dillaWallet");

const router = express.Router();

router.post("/create-account", createDillaWallet);

router.put("/top-up-account/:id", topUp);

router.put("/transfer/:id", transferMoney);

module.exports = router;
