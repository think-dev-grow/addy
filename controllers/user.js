const User = require("../models/User");
const jwt = require("jsonwebtoken");
const handleError = require("../utils/error");

const getUserById = async (req, res, next) => {
  try {
    const id = req.params.id;

    const user = await User.findById(id);

    if (!user) return next(handleError(400, "user does not exist"));

    res.status(200).json({ success: true, user });
  } catch (error) {
    next(error);
  }
};

const getUser = async (req, res, next) => {
  try {
    let value;
    const token = req.params.token;

    jwt.verify(String(token), process.env.JWT, (err, user) => {
      if (err) return next(handleError(400, "Token Expired"));

      value = user;
    });

    const user = await User.findById(value.id);

    if (!user) return next(handleError(400, "user does not exist"));

    res.status(200).json({ success: true, user });
  } catch (error) {
    next(error);
  }
};

module.exports = { getUser, getUserById };
