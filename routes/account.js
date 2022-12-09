const express = require("express");
const {
  createAccount,
  getAccountStatement,
  autoTargetEmgPlan,
  autoTargetEmgPlanCalc,
  customFlexPlan,
} = require("../controllers/account");
const router = express.Router();

router.post("/create-account", createAccount);

router.get("/get-account/:id", getAccountStatement);

router.put("/auto-flex-plan/:id", autoTargetEmgPlan);

router.put("/calc-target-saving-rate/:id", autoTargetEmgPlanCalc);

router.put("/custom-flex-plan/:id", customFlexPlan);

module.exports = router;
