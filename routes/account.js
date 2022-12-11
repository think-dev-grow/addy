const express = require("express");
const {
  createAccount,
  getAccountStatement,
  autoTargetEmgPlan,
  autoTargetEmgPlanCalc,
  customFlexPlanAPI1,
  customFlexPlanAPI2,
  customFlexPlanAPI3,
} = require("../controllers/account");
const router = express.Router();

router.post("/create-account", createAccount);

router.get("/get-account/:id", getAccountStatement);

router.put("/auto-flex-plan/:id", autoTargetEmgPlan);

router.put("/calc-target-saving-rate/:id", autoTargetEmgPlanCalc);

router.put("/custom-flex-plan/total-saving/:id", customFlexPlanAPI1);

router.put("/custom-flex-plan/monthly-saving/:id", customFlexPlanAPI2);

router.put("/custom-flex-plan/duration/:id", customFlexPlanAPI3);

module.exports = router;
