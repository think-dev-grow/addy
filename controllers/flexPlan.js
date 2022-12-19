const FlexPlan = require("../models/FlexPlan");
var abbreviate = require("number-abbreviate");

const handleError = require("../utils/error");

const createFP = async (req, res, next) => {
  try {
    const userAcct = await FlexPlan.findOne({ userID: req.body.userID });

    // if (userAcct)
    //   return next(handleError(400, "you already have a Flex account."));

    const data = FlexPlan(req.body);

    const flexPlan = await data.save();

    res.status(200).json({
      msg: "wise people creat a target and save",
      flexPlan,
      success: true,
    });
  } catch (error) {
    next(error);
  }
};

// const targetPlanName = async (req, res, next) => {
//   try {
//     const targetPlan = await TargetPlan.findOneAndUpdate(
//       { userID: req.params.id },
//       {
//         $set: {
//           name: req.body.name,
//         },
//       },
//       { new: true }
//     );

//     res.status(200).json({
//       msg: "fun name",
//       targetPlan,
//       success: true,
//     });
//   } catch (error) {
//     next(error);
//   }
// };

const autoFlexPlanEarn = async (req, res, next) => {
  try {
    const id = req.params.id;
    const { ern } = req.body;

    const psr1 = abbreviate(ern * 0.4);
    const psr2 = abbreviate(ern * 0.6);
    const psr3 = abbreviate(ern * 0.8);

    const psrange = [psr1, `${psr1}-${psr2}`, `${psr2}-${psr3}`];
    const cPsr = [ern * 0.4, ern * 0.6, ern * 0.8];

    const userAcct = await FlexPlan.findOne({ userID: id });
    //Cast (run check)

    const plan = await FlexPlan.findOneAndUpdate(
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

const autoFlexPlanExp = async (req, res, next) => {
  try {
    const id = req.params.id;
    const { value } = req.body;

    const index = value - 1;

    const fpData = await FlexPlan.findOne({ userID: id });

    const diff = fpData.earn - fpData.cPsr[index];

    const autoSavingRate = diff * 0.4;

    const autoSavingTarget = fpData.cPsr[index] * 6;

    const autoDuration = autoSavingTarget / autoSavingRate;

    // Cast (run check)

    const plan = await FlexPlan.findOneAndUpdate(
      { userID: id },
      {
        $set: {
          exp: fpData.cPsr[index],
          autoDuration,
          autoSavingTarget,
          autoSavingRate,
        },
      },
      { new: true }
    );

    res.status(200).json({
      success: true,
      msg: `exp`,
      value,
      index,
      plan,
    });
  } catch (error) {
    next(error);
  }
};

//CUSTOM PLAN STARTS HERE

const customFlexPlanSavingTarget = async (req, res, next) => {
  try {
    const id = req.params.id;
    const { savingTarget } = req.body;

    const userAcct = await FlexPlan.findOne({ userID: id });
    //Cast (run check)

    const plan = await FlexPlan.findOneAndUpdate(
      { userID: id },
      { $set: { customSavingTarget: savingTarget, type: "custom" } },
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

const customFlexPlanSavingRate = async (req, res, next) => {
  try {
    const id = req.params.id;
    const { savingRate } = req.body;

    const userAcct = await FlexPlan.findOne({ userID: id });
    //Cast (run check)

    const plan = await FlexPlan.findOneAndUpdate(
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

const customFlexPlanDuration = async (req, res, next) => {
  try {
    const id = req.params.id;
    const { duration } = req.body;

    const userAcct = await FlexPlan.findOne({ userID: id });
    //Cast (run check)

    const plan = await FlexPlan.findOneAndUpdate(
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

const getFlexPlanAccount = async (req, res, next) => {
  try {
    const id = req.params.id;

    const flexPlan = await FlexPlan.findOne({ userID: id });

    res.status(200).json({ success: true, flexPlan });
  } catch (error) {
    next(error);
  }
};

const setSavingPeriod = async (req, res, next) => {
  try {
    const id = req.params.id;
    const { period } = req.body;

    const userAcct = await FlexPlan.findOne({ userID: id });
    //Cast (run check)

    const plan = await FlexPlan.findOneAndUpdate(
      { userID: id },
      { $set: { savingPeriod: period } },
      { new: true }
    );

    res.status(200).json({
      success: true,
      msg: `Great choice cadet `,
      plan,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createFP,
  //   targetPlanName,
  autoFlexPlanEarn,
  autoFlexPlanExp,
  customFlexPlanSavingTarget,
  customFlexPlanSavingRate,
  customFlexPlanDuration,
  getFlexPlanAccount,
  setSavingPeriod,
};
