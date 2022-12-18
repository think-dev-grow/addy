const express = require("express");

const {
  createFP,
  //   targetPlanName,
  autoFlexPlanEarn,
  autoFlexPlanExp,
  customFlexPlanSavingTarget,
  customFlexPlanSavingRate,
  customFlexPlanDuration,
  getFlexPlanAccount,
} = require("../controllers/flexPlan");

const router = express.Router();

router.post("/create-account", createFP);

// router.put("/Target-plan-name/:id", targetPlanName);

router.put("/set-earning/:id", autoFlexPlanEarn);

router.put("/set-expenditure/:id", autoFlexPlanExp);

//Custom Target-Plan
router.put("/custom-saving-target/:id", customFlexPlanSavingTarget);

router.put("/custom-saving-rate/:id", customFlexPlanSavingRate);

router.put("/custom-duration/:id", customFlexPlanDuration);

router.get("/get-flex-account/:id", getFlexPlanAccount);

module.exports = router;
