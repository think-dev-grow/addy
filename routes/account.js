const express = require("express");
const {
  createAccount,
  getAccountStatement,
  autoFlexPlan,
} = require("../controllers/account");
const router = express.Router();

router.post("/create-account", createAccount);

router.get("/get-account/:id", getAccountStatement);

router.put("/auto-flex-plan/:id", autoFlexPlan);

module.exports = router;
