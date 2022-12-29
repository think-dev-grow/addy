// const DillaWallet = require("../models/DillaWallet");
// const FlexPlan = require("../models/FlexPlan");
const User = require("../models/User");
const SanAccount = require("../models/SanAccount");
// var abbreviate = require("number-abbreviate");

const handleError = require("../utils/error");

// const { v4: uuidv4 } = require("uuid");
// const { isObjectIdOrHexString } = require("mongoose");

const createSanAccount = async (req, res, next) => {
  try {
    const sanAcct = await SanAccount.findOne({ userID: req.body.userID });

    const user = await User.findById(req.body.userID);
    const name = `${user.firstname} ${user.lastname}`;

    if (sanAcct)
      return next(handleError(400, "you already have a SAN account."));

    const sanDetails = new SanAccount({
      accountName: name,
      userID: req.body.userID,
    });

    const data = await sanDetails.save();

    res.status(200).json({
      success: true,
      msg: "SAN account has been created succesfully",
      data,
    });
  } catch (error) {
    next(error);
  }
};

const getSanAccount = async (req, res, next) => {
  try {
    const id = req.params.id;

    const sanAccount = await SanAccount.findOne({ userID: id });

    res.status(200).json({ success: true, sanAccount });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createSanAccount,
  getSanAccount,
};
