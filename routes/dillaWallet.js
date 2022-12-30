const express = require("express");

const {
  createDillaWallet,
  topUp,
  transferMoneyToDilla,
  getDillaWallet,
  transferToMySan,
  requestMoney,
} = require("../controllers/dillaWallet");

const router = express.Router();

router.post("/create-account", createDillaWallet);

router.put("/top-up-account/:id", topUp);

router.put("/transfer/:id", transferMoneyToDilla);

router.put("/transfer-to-san/:id", transferToMySan);

router.get("/get-dilla-wallet/:id", getDillaWallet);

router.put("/request-money/:id", requestMoney);

module.exports = router;
