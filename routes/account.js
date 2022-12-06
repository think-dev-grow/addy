const express = require("express");
const {
  createAccount,
  getAccountStatement,
} = require("../controllers/account");
const router = express.Router();

router.post("/create-account", createAccount);

router.get("/get-account/:id", getAccountStatement);

module.exports = router;
