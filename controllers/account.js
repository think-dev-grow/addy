const ArdillaAccount = require("../models/ArdillaAct");

const handleError = require("../utils/error");
var mongoose = require("mongoose");
const User = require("../models/User");

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

const autoTargetEmgPlan = async (req, res, next) => {
  try {
    const id = req.params.id;
    const { ern } = req.body;

    const psr1 = Intl.NumberFormat("en-US").format(ern * 0.4);
    const psr2 = Intl.NumberFormat("en-US").format(ern * 0.6);
    const psr3 = Intl.NumberFormat("en-US").format(ern * 0.8);

    const psrange = [psr1, `${psr1}-${psr2}`, `${psr2}-${psr3}`];
    const cPsr = [ern * 0.4, ern * 0.6, ern * 0.8];

    const userAcct = await ArdillaAccount.findOne({ userID: id });

    const plan = await ArdillaAccount.findOneAndUpdate(
      { userID: id },
      { $set: { flexPlan: { ...userAcct.flexPlan, ern, psrange, cPsr } } },
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

const autoTargetEmgPlanCalc = async (req, res, next) => {
  try {
    const id = req.params.id;
    const { exp } = req.body;

    const userAcct = await ArdillaAccount.findOne({ userID: id });
    //run check here

    const plan = await ArdillaAccount.findOneAndUpdate(
      { userID: id },
      { $set: { psDetails: { ...exp } } },
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

const customFlexPlan = async (req, res, next) => {
  try {
    const { info, stuff } = req.body;

    const id = req.params.id;

    const userAcct = await ArdillaAccount.findOne({ userID: id });

    const plan = await ArdillaAccount.findOneAndUpdate(
      { userID: req.params.id },
      { $set: { flexPlan: { ...userAcct.flexPlan, stuff, info } } },
      { new: true }
    );

    res.status(200).json(plan);
    console.log(stuff);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createAccount,
  getAccountStatement,
  autoTargetEmgPlan,
  autoTargetEmgPlanCalc,
  customFlexPlan,
};
