const TargetPlan = require("../models/TargetPlan");
var abbreviate = require("number-abbreviate");

const handleError = require("../utils/error");

const createTP = async (req, res, next) => {
  try {
    const userAcct = await TargetPlan.findOne({ userID: req.body.userID });

    if (userAcct)
      return next(handleError(400, "you already have a Target account."));

    const data = TargetPlan(req.body);

    const targetPlan = await data.save();

    res.status(200).json({
      msg: "wise people creat a target and save",
      targetPlan,
      success: true,
    });
  } catch (error) {
    next(error);
  }
};

const targetPlanName = async (req, res, next) => {
  try {
    const targetPlan = await TargetPlan.findOneAndUpdate(
      { userID: req.params.id },
      {
        $set: {
          name: req.body.name,
        },
      },
      { new: true }
    );

    res.status(200).json({
      msg: "fun name",
      targetPlan,
      success: true,
    });
  } catch (error) {
    next(error);
  }
};

const autoTargetPlanEarn = async (req, res, next) => {
  try {
    const id = req.params.id;
    const { ern } = req.body;

    const psr1 = abbreviate(ern * 0.4);
    const psr2 = abbreviate(ern * 0.6);
    const psr3 = abbreviate(ern * 0.8);

    const psrange = [psr1, `${psr1}-${psr2}`, `${psr2}-${psr3}`];
    const cPsr = [ern * 0.4, ern * 0.6, ern * 0.8];

    const userAcct = await TargetPlan.findOne({ userID: id });
    //Cast (run check)

    const plan = await TargetPlan.findOneAndUpdate(
      { userID: id },
      { $set: { earn: ern, psr: psrange, cPsr } },
      { new: true }
    );

    res.status(200).json({
      success: true,
      msg: `Get to saving..`,
      plan,
    });
  } catch (error) {
    next(error);
  }
};

const autoTargetPlanExp = async (req, res, next) => {
  try {
    const id = req.params.id;
    const { value } = req.body;

    const tpData = await TargetPlan.findOne({ userID: id });

    const diff = tpData.earn - tpData.cPsr[value - 1];

    const autoSavingRate = diff * 0.4;

    const autoSavingTarget = tpData.cPsr[value - 1] * 6;

    const autoDuration = autoSavingTarget / autoSavingRate;

    // Cast (run check)

    const plan = await TargetPlan.findOneAndUpdate(
      { userID: id },
      { $set: { exp: diff, autoDuration, autoSavingTarget, autoSavingRate } },
      { new: true }
    );

    res.status(200).json({
      success: true,
      msg: `exp`,
      value,
      plan,
    });
  } catch (error) {
    next(error);
  }
};

//CUSTOM PLAN STARTS HERE

const customTargetPlanSavingTarget = async (req, res, next) => {
  try {
    const id = req.params.id;
    const { savingTarget } = req.body;

    const userAcct = await TargetPlan.findOne({ userID: id });
    //Cast (run check)

    const plan = await TargetPlan.findOneAndUpdate(
      { userID: id },
      { $set: { customSavingTarget: savingTarget } },
      { new: true }
    );

    res.status(200).json({
      success: true,
      msg: `Get to saving..`,
      plan,
    });
  } catch (error) {
    next(error);
  }
};

const customTargetPlanSavingRate = async (req, res, next) => {
  try {
    const id = req.params.id;
    const { savingRate } = req.body;

    const userAcct = await TargetPlan.findOne({ userID: id });
    //Cast (run check)

    const plan = await TargetPlan.findOneAndUpdate(
      { userID: id },
      { $set: { customSavingRate: savingRate } },
      { new: true }
    );

    res.status(200).json({
      success: true,
      msg: `Get to saving..`,
      plan,
    });
  } catch (error) {
    next(error);
  }
};

const customTargetPlanDuration = async (req, res, next) => {
  try {
    const id = req.params.id;
    const { duration } = req.body;

    const userAcct = await TargetPlan.findOne({ userID: id });
    //Cast (run check)

    const plan = await TargetPlan.findOneAndUpdate(
      { userID: id },
      { $set: { customDuration: duration } },
      { new: true }
    );

    res.status(200).json({
      success: true,
      msg: `Get to saving..`,
      plan,
    });
  } catch (error) {
    next(error);
  }
};

const getTargetPlanAccount = async (req, res, next) => {
  try {
    const id = req.params.id;

    const targetPlan = await TargetPlan.findOne({ userID: id });

    res.status(200).json({ success: true, targetPlan });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createTP,
  targetPlanName,
  autoTargetPlanEarn,
  autoTargetPlanExp,
  customTargetPlanSavingTarget,
  customTargetPlanSavingRate,
  customTargetPlanDuration,
  getTargetPlanAccount,
};
