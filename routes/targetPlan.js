const express = require("express");

const {
  createTP,
  targetPlanName,
  autoTargetPlanEarn,
  autoTargetPlanExp,
  customTargetPlanSavingTarget,
  customTargetPlanSavingRate,
  customTargetPlanDuration,
  getTargetPlanAccount,
  setSavingPeriod,
} = require("../controllers/targetPlan");

const router = express.Router();

router.post("/create-account", createTP);

router.put("/Target-plan-name/:id", targetPlanName);

router.put("/set-earning/:id", autoTargetPlanEarn);

router.put("/set-expenditure/:id", autoTargetPlanExp);

router.put("/saving-period/:id", setSavingPeriod);

//Custom Target-Plan
router.put("/custom-saving-target/:id", customTargetPlanSavingTarget);

router.put("/custom-saving-rate/:id", customTargetPlanSavingRate);

router.put("/custom-duration/:id", customTargetPlanDuration);

router.get("/get-target-account/:id", getTargetPlanAccount);

module.exports = router;
