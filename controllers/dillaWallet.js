const DillaWallet = require("../models/DillaWallet");
var abbreviate = require("number-abbreviate");

const handleError = require("../utils/error");

const { v4: uuidv4 } = require("uuid");

const createDillaWallet = async (req, res, next) => {
  try {
    const dillaWallet = await DillaWallet.findOne({ userID: req.body.userID });

    if (dillaWallet)
      return next(handleError(400, "you already have a dilla wallet account."));

    const dwDetails = new DillaWallet({
      accountNumber: uuidv4(),
      userID: req.body.userID,
    });

    const data = await dwDetails.save();

    res.status(200).json({
      success: true,
      msg: "Dilla wallet has been created succesfully",
      data,
    });
  } catch (error) {
    next(error);
  }
};

const transferMoney = async (req, res, next) => {
  try {
  } catch (error) {
    next(error);
  }
};

module.exports = { createDillaWallet };
