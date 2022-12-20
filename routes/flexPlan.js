const express = require("express");

const {
  createFP,
  autoFlexPlanEarn,
  autoFlexPlanExp,
  customFlexPlanSavingTarget,
  customFlexPlanSavingRate,
  customFlexPlanDuration,
  getFlexPlanAccount,
  setSavingPeriod,
  calcIntrest,
  activatePlanAPI,
} = require("../controllers/flexPlan");

const router = express.Router();

router.post("/create-account", createFP);

router.put("/set-earning/:id", autoFlexPlanEarn);

router.put("/set-expenditure/:id", autoFlexPlanExp);

//Custom Target-Plan
router.put("/custom-saving-target/:id", customFlexPlanSavingTarget);

router.put("/custom-saving-rate/:id", customFlexPlanSavingRate);

router.put("/custom-duration/:id", customFlexPlanDuration);

router.get("/get-flex-account/:id", getFlexPlanAccount);

// End of custom plan

//New Stuff Starts Here
router.put("/saving-period/:id", setSavingPeriod);

router.get("/calculate-intrest/:id", calcIntrest);

router.put("/activate-plan/:id", activatePlanAPI);

module.exports = router;
