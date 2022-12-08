const express = require("express");
const {
  createAccount,
  getAccountStatement,
  autoTargetEmgPlan,
} = require("../controllers/account");
const router = express.Router();

router.post("/create-account", createAccount);

router.get("/get-account/:id", getAccountStatement);

router.put("/auto-flex-plan/:id", autoTargetEmgPlan);

module.exports = router;
