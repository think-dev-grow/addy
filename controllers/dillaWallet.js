const DillaWallet = require("../models/DillaWallet");
const FlexPlan = require("../models/FlexPlan");
const User = require("../models/User");
const SanAccount = require("../models/SanAccount");
var abbreviate = require("number-abbreviate");

const handleError = require("../utils/error");

const { v4: uuidv4 } = require("uuid");

const createDillaWallet = async (req, res, next) => {
  try {
    const dillaWallet = await DillaWallet.findOne({ userID: req.body.userID });

    const user = await User.findById(req.body.userID);
    const name = `${user.firstname} ${user.lastname}`;

    if (dillaWallet)
      return next(handleError(400, "you already have a dilla wallet account."));

    const dwDetails = new DillaWallet({
      userID: req.body.userID,
      accountName: name,
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

const topUp = async (req, res, next) => {
  try {
    const { amount, email } = req.body;
    const id = req.params.id;

    // const value;

    const day = new Date().getDay();
    const month = new Date().getMonth();
    const year = new Date().getFullYear();

    const hour = new Date().getHours();
    const minute = new Date().getMinutes();

    const check = minute <= 9 ? `0${minute}` : minute;

    const dillaWallet = await DillaWallet.findOne({
      userID: id,
    });

    if (!dillaWallet)
      return next(handleError(400, "Hey ,you dont have a dilla wallet yet"));

    if (dillaWallet.userID !== id)
      return next(handleError(400, "This is not your account"));

    const transcactionHistoryData = {
      amount,
      email,
      date: `${day}-${month}-${year}`,
      time: `${hour}:${check}`,
      transactionType: "Credit",
    };

    const topUp = await DillaWallet.findOneAndUpdate(
      { userID: id },
      {
        $set: {
          accountBalance: dillaWallet.accountBalance + amount,
          transcactionHistory: [
            ...dillaWallet.transcactionHistory,
            transcactionHistoryData,
          ],
        },
      },
      { new: true }
    );

    res.status(200).json({ msg: "Top up successful", topUp, success: true });
    // res.status(200).json({ id, dillaWallet, transcactionHistoryData, topUp });
  } catch (error) {
    next(error);
  }
};

const transferMoneyToDilla = async (req, res, next) => {
  try {
    const { amount, pin, userID, ots } = req.body;
    const id = req.params.id;

    const day = new Date().getDay();
    const month = new Date().getMonth();
    const year = new Date().getFullYear();

    const hour = new Date().getHours();
    const minute = new Date().getMinutes();

    const check = minute <= 9 ? `0${minute}` : minute;

    const to = await DillaWallet.findOne({
      userID: userID,
    });

    const from = await DillaWallet.findOne({
      userID: id,
    });

    const user = await User.findById(id);

    if (!to) return next(handleError(400, "there no account with this number"));

    if (amount > from.accountBalance)
      return next(
        handleError(
          400,
          "insufficient fund , please top up your dilla wallet first"
        )
      );

    if (pin !== user.transactionPin)
      return next(handleError(400, "Incorrect pin"));

    const fromTranscactionHistoryData = {
      amount,
      date: `${day}-${month}-${year}`,
      time: `${hour}:${check}`,
      transactionType: "Debit",
      status: "Pending",
      ots,
    };

    const fromDillaWallet = await DillaWallet.findOneAndUpdate(
      { userID: id },
      {
        $set: {
          transcactionHistory: [
            ...from.transcactionHistory,
            fromTranscactionHistoryData,
          ],
        },
      },
      { new: true }
    );

    const toTranscactionHistoryData = {
      amount,
      date: `${day}-${month}-${year}`,
      time: `${hour}:${check}`,
      transactionType: "Credit",
      status: "Pending",
      ots,
    };

    const toDillaWallet = await DillaWallet.findOneAndUpdate(
      { userID: userID },
      {
        $set: {
          transcactionHistory: [
            ...to.transcactionHistory,
            toTranscactionHistoryData,
          ],
        },
      },
      { new: true }
    );

    res.status(200).json({ toDillaWallet, fromDillaWallet });
  } catch (error) {
    next(error);
  }
};

const requestMoney = async (req, res, next) => {
  try {
    const { amount, userID } = req.body;
    const id = req.params.id;

    const day = new Date().getDay();
    const month = new Date().getMonth();
    const year = new Date().getFullYear();

    const hour = new Date().getHours();
    const minute = new Date().getMinutes();

    const check = minute <= 9 ? `0${minute}` : minute;

    const to = await DillaWallet.findOne({
      userID: userID,
    });

    const from = await DillaWallet.findOne({
      userID: id,
    });

    const user = await User.findById(id);

    if (!to) return next(handleError(400, "there no account with this number"));

    // if (flexAcct.userID !== id)
    //   return next(handleError(400, "This is not your account"));

    // if (amount > from.accountBalance)
    //   return next(
    //     handleError(
    //       400,
    //       "insufficient fund , please top up your dilla wallet first"
    //     )
    //   );

    // if (pin !== user.transactionPin)
    //   return next(handleError(400, "Incorrect pin"));

    // const fromCurrentBalance = from.accountBalance - amount;
    // const toCurrentBalance = to.accountBalance + amount;

    const fromTranscactionHistoryData = {
      amount,
      date: `${day}-${month}-${year}`,
      time: `${hour}:${check}`,
      transactionType: "Request",
      status: "Pending",
    };

    const fromDillaWallet = await DillaWallet.findOneAndUpdate(
      { userID: id },
      {
        $set: {
          transcactionHistory: [
            ...from.transcactionHistory,
            fromTranscactionHistoryData,
          ],
        },
      },
      { new: true }
    );

    const toTranscactionHistoryData = {
      amount,
      date: `${day}-${month}-${year}`,
      time: `${hour}:${check}`,
      transactionType: "Request",
      status: "Pending",
    };

    const toDillaWallet = await DillaWallet.findOneAndUpdate(
      { userID: userID },
      {
        $set: {
          transcactionHistory: [
            ...to.transcactionHistory,
            toTranscactionHistoryData,
          ],
        },
      },
      { new: true }
    );

    res.status(200).json({ toDillaWallet, fromDillaWallet });
  } catch (error) {
    next(error);
  }
};

const getDillaWallet = async (req, res, next) => {
  try {
    const id = req.params.id;

    const dillaWallet = await DillaWallet.findOne({ userID: id });

    res.status(200).json({ success: true, dillaWallet });
  } catch (error) {
    next(error);
  }
};

const transferToMySan = async (req, res, next) => {
  try {
    const { amount, accountNumber, pin } = req.body;
    const id = req.params.id;

    const day = new Date().getDay();
    const month = new Date().getMonth();
    const year = new Date().getFullYear();

    const hour = new Date().getHours();
    const minute = new Date().getMinutes();

    const check = minute <= 9 ? `0${minute}` : minute;

    const sanAcct = await SanAccount.findOne({
      userID: id,
    });

    const dillaWallet = await DillaWallet.findOne({
      userID: id,
    });

    const user = await User.findById(id);

    if (!sanAcct)
      return next(handleError(400, "there no account with this number"));

    if (sanAcct.userID !== id)
      return next(handleError(400, "This is not your account"));

    if (amount > dillaWallet.accountBalance)
      return next(
        handleError(
          400,
          "insufficient fund , please top up your dilla wallet first"
        )
      );

    if (pin !== user.transactionPin)
      return next(handleError(400, "Incorrect pin"));

    const dillacurrentBalance = dillaWallet.accountBalance - amount;
    const sancurrentBalance = sanAcct.accountBalance + amount;

    const dillaTranscactionHistoryData = {
      amount,
      date: `${day}-${month}-${year}`,
      time: `${hour}:${check}`,
      transactionType: "Debit",
      dillacurrentBalance,
    };

    const dilla = await DillaWallet.findOneAndUpdate(
      { userID: id },
      {
        $set: {
          accountBalance: dillacurrentBalance,
          transcactionHistory: [
            ...dillaWallet.transcactionHistory,
            dillaTranscactionHistoryData,
          ],
        },
      },
      { new: true }
    );

    const sanTranscactionHistoryData = {
      amount,
      date: `${day}-${month}-${year}`,
      time: `${hour}:${check}`,
      transactionType: "Credit",
      sancurrentBalance,
    };

    const san = await SanAccount.findOneAndUpdate(
      { userID: id },
      {
        $set: {
          accountBalance: sancurrentBalance,
          transcactionHistory: [
            ...sanAcct.transcactionHistory,
            sanTranscactionHistoryData,
          ],
        },
      },
      { new: true }
    );

    res.status(200).json({ san });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createDillaWallet,
  topUp,
  transferMoneyToDilla,
  getDillaWallet,
  transferToMySan,
  requestMoney,
};
