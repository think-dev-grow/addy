const ArdillaAccount = require("../models/ArdillaAct");

const handleError = require("../utils/error");

const createAccount = async (req, res, next) => {
  try {
    const id = req.body._id;

    const accountDetail = new ArdillaAccount({
      userID: id,
    });

    await accountDetail.save();

    console.log(accountDetail);

    res.status(201).json({ msg: "accounted created", accountDetail });
  } catch (error) {
    next(error);
  }
};

module.exports = { createAccount };
