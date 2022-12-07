const ArdillaAccount = require("../models/ArdillaAct");

const handleError = require("../utils/error");
var mongoose = require("mongoose");

const createAccount = async (req, res, next) => {
  try {
    //protect either token or query
    const accountDetail = new ArdillaAccount(req.body);

    const test = await accountDetail.save();

    res.status(201).json({ msg: "accounted created", test });
  } catch (error) {
    next(error);
  }
};

const getAccountStatement = async (req, res, next) => {
  try {
    //protect either token or query
    const id = req.params.id;

    const acct = await ArdillaAccount.findOne({ userID: id });

    if (!acct) return next(handleError(404, "User does not have an account."));

    res.status(200).json({ success: true, acct });
  } catch (error) {
    next(error);
  }
};

const autoFlexPlan = async (req, res, next) => {
  try {
    const { flexPlanObj } = req.body;

    const { ern, exp } = flexPlanObj;

    if (exp) {
      const calc = ern - exp;

      const flexPlanData = { type, ern, exp, psv: calc };

      const plan = await ArdillaAccount.findOneAndUpdate(
        { userID: req.params.id },
        { $set: { flexPlan: flexPlanData } },
        { new: true }
      );

      res.status(200).json({
        success: true,
        msg: `Get to saving`,
        data: plan,
      });
    } else {
      const flexPlanData = { ern, exp, psv: calc };

      const plan = await ArdillaAccount.findOneAndUpdate(
        { userID: req.params.id },
        { $set: { flexPlan: flexPlanData } },
        { new: true }
      );

      res.status(200).json({
        success: true,
        msg: `Get to saving..`,
        data: plan,
      });
    }
  } catch (error) {
    next(error);
  }
};

module.exports = { createAccount, getAccountStatement, autoFlexPlan };
