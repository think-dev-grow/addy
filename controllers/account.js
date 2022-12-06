const ArdillaAccount = require("../models/ArdillaAct");

const handleError = require("../utils/error");

const createAccount = async (req, res, next) => {
  try {
    const accountDetail = new ArdillaAccount(req.body);

    const test = await accountDetail.save();

    res.status(201).json({ msg: "accounted created", test });
  } catch (error) {
    next(error);
  }
};

const getAccountStatement = async (req, res, next) => {
  try {
    const id = req.params.id;

    const acct = await ArdillaAccount.findById(id);

    res.status(200).json(acct);
  } catch (error) {
    next(error);
  }
};

module.exports = { createAccount, getAccountStatement };
