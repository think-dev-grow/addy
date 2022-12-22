const express = require("express");

const {
  createDillaWallet,
  topUp,
  transferMoney,
  getDillaWallet,
} = require("../controllers/dillaWallet");

const router = express.Router();

router.post("/create-account", createDillaWallet);

router.put("/top-up-account/:id", topUp);

router.put("/transfer/:id", transferMoney);

router.get("/get-dilla-wallet/:id", getDillaWallet);

module.exports = router;
