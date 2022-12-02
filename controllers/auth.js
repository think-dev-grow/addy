const User = require("../models/User");

const randomize = require("randomatic");
const { Random } = require("random-js");
const crypto = require("crypto");
const rn = require("random-number");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const { ms, s, m, h, d } = require("time-convert");

const handleError = require("../utils/error");
const {
  sendVerificationMail,
  resetPassword,
  sendCompleteProfile,
  ceoMail,
  supportMail,
  loginMail,
} = require("../utils/sendMail");

const { findOne } = require("../models/User");

const random = new Random();

const options = {
  min: 100,
  max: 999,
  integer: true,
};

//sendOTP API
const sendOTP = async (req, res, next) => {
  try {
    const check = await User.findOne({ email: req.body.email });

    //if there's is no user Logic
    if (!check) {
      const userDetails = new User(req.body);
      let value = randomize("0", 7);

      const data = await userDetails.save();

      const payload = {
        id: data._id,
        email: data.email,
        et: value,
      };

      const token = jwt.sign(payload, process.env.JWT, { expiresIn: "3m" });

      sendVerificationMail(data.email, value);

      const { email, _id } = data._doc;

      res.status(200).json({ id: _id, email, token, user: data });
    }

    //if there's an unfinished Registration
    if (check && !check.dhid) {
      await User.findOneAndDelete({ email: check.email });

      const user = new User(req.body);
      let value = randomize("0", 7);

      const data = await user.save();

      const payload = {
        id: data._id,
        email: data.email,
        et: value,
      };

      const token = jwt.sign(payload, process.env.JWT, { expiresIn: "3m" });

      sendVerificationMail(data.email, value);

      const { email, _id } = data._doc;

      res
        .status(200)
        .json({ id: _id, email, token, msg: "Token resent", user: data });
    }

    //if user has finish his registration
    if (check && check.dhid) {
      return next(handleError(400, "User already exist"));
    }
  } catch (error) {
    next(handleError(500, "Network Error"));
  }
};

//VerifyOTP API
const verifyOTP = async (req, res, next) => {
  try {
    const code = req.body.code;
    let value;
    const token = req.params.token;
    const id = req.params.id;

    jwt.verify(String(token), process.env.JWT, (err, user) => {
      if (err) return next(handleError(400, "Token Expired"));

      value = user;
    });

    if (value.et === code) {
      const check = await User.findById(id);

      if (!check) return next(handleError(400, "User does not exist."));

      //magic happens herer
      const data = await User.findOneAndUpdate(
        { _id: id },
        {
          verified: "otp",
        },
        { new: true }
      );

      return res
        .status(200)
        .json({ success: true, msg: "verification okay", data });
    } else {
      next(handleError(400, "incorrect code"));
    }
  } catch (error) {
    next(error);
  }
};

//Complete-profile API
const completeProfile = async (req, res, next) => {
  try {
    //check if user exist by ID
    const check = await User.findById(req.params.id);
    if (!check) return next(handleError(400, "User does not exist."));

    //check if kodeHex name exist
    const checkUsername = await User.findOne({ kodeHex: req.body.kodeHex });
    if (checkUsername)
      return next(handleError(400, "KodeHex name is already taken."));

    //check if email exist
    const checkEmail = await User.findOne({ email: req.body.email });
    if (checkEmail.dhid) return next(handleError(400, "Email already in use"));

    //check if contact exist
    const checkContact = await User.findOne({ contact: req.body.contact });
    if (checkContact) return next(handleError("400", "Contact already exist."));

    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(req.body.password, salt);

    check.firstname = req.body.firstname;
    check.lastname = req.body.lastname;
    check.uid = `30${rn(options)}${random.integer(10, 99)}${randomize("0", 3)}`;
    check.dhid = crypto.randomBytes(64).toString("hex");
    check.contact = req.body.contact;
    check.password = hash;
    check.kodeHex = req.body.kodeHex;
    check.ipAddress = req.body.ip;

    const verifiedUser = await check.save();

    sendCompleteProfile(verifiedUser.email, verifiedUser.kodeHex);
    ceoMail(verifiedUser.email, verifiedUser.kodeHex);
    supportMail(verifiedUser.email, verifiedUser.kodeHex);

    //magic happens here
    const data = await User.findOneAndUpdate(
      { _id: req.params.id },
      {
        verified: "cp",
      },
      { new: true }
    );

    res.status(200).json({
      success: true,
      msg: `Hey ${verifiedUser.kodeHex},Registration completed.`,
      data,
    });
  } catch (error) {
    next(error);
  }
};

//Wrong Email API
const wrongEmail = async (req, res, next) => {
  try {
    const check = await User.findById(req.params.id);

    if (!check) return next(handleError(404, "User does not exist."));

    await User.findByIdAndDelete(req.params.id);

    res.status(200).json({ success: true, msg: "email removed from DB" });
  } catch (error) {
    next(error);
  }
};

//Wrong Contact API
const wrongContact = async (req, res, next) => {
  try {
    const check = await User.findById(req.params.id);

    const { newPhoneNumber } = req.body;

    if (!check) return next(handleError(404, "User does not exist."));

    const userUpdate = await User.findOneAndUpdate(
      { _id: req.params.id },
      { contact: newPhoneNumber },
      { new: true }
    );

    res
      .status(200)
      .json({ success: true, msg: "email removed from DB", user: userUpdate });
  } catch (error) {
    next(error);
  }
};

//Security Question API
const securityQusetion = async (req, res, next) => {
  try {
    const check = await User.findById(req.params.id);

    if (!check) return next(handleError(404, "User does not exist."));

    const sq = req.body.securityQusetion;

    const sqUpdate = await User.findOneAndUpdate(
      { _id: req.params.id },
      { securityQusetion: sq },
      { new: true }
    );

    const data = await User.findOneAndUpdate(
      { _id: req.params.id },
      { verified: "sq" },
      { new: true }
    );

    res.status(200).json({
      success: true,
      msg: `Dont worry ${sqUpdate.kodeHex} , Your secret is safe with us`,
      data,
    });
  } catch (error) {
    next(error);
  }
};

//login API
const login = async (req, res, next) => {
  try {
    const {
      email,
      password,
      ip,
      platName,
      userOs,
      logDetails,
      currentTimestamp,
    } = req.body;

    const user = await User.findOne({ email: email });

    const diff = currentTimestamp - user.logStamp;

    if (!user) return next(handleError(404, "User does not exist."));

    if (!user.dhid) return next(handleError(404, "This email is Invalid."));

    const confirmPassword = await bcrypt.compare(password, user.password);

    if (!confirmPassword) return next(handleError(400, "Password incorrect."));

    if (diff < 180000) return next(handleError(404, "user already logged in."));

    const data = await User.findOneAndUpdate(
      { _id: user._id },
      { logDetails, logStamp: currentTimestamp },
      { new: true }
    );

    const min = ms.to(m)(diff);

    const payload = {
      id: user._id,
      email: user.email,
    };

    const token = jwt.sign(payload, process.env.JWT, { expiresIn: "20m" });

    if (user.ipAddress !== ip) {
      loginMail(
        user.email,
        user.kodeHex,
        platName,
        userOs,
        data.logDetails.city,
        data.logDetails.countryCode
      );
    }

    res.status(200).json({
      success: true,
      msg: `${user.kodeHex} , Login was successfull`,
      token,
      user,
      diff,
      min,
    });
  } catch (error) {
    next(error);
  }
};

const refreshToken = async (req, res, next) => {
  try {
    const prevToken = req.params.token;
    let value;
    let token;

    if (!prevToken)
      return res.status(401).json({ success: false, msg: "Not allowed" });

    jwt.verify(prevToken, process.env.JWT, function (err, decoded) {
      if (err)
        return res.status(401).json({ success: false, msg: "Token expired" });

      const payload = {
        id: decoded.id,
      };

      token = jwt.sign(payload, process.env.JWT, { expiresIn: "25m" });
      value = decoded;
    });

    const data = await User.findOneAndUpdate(
      { _id: value.id },
      { logStamp: new Date().getTime() },
      { new: true }
    );

    res.status(200).json({ success: true, token, data });
  } catch (error) {
    next(error);
  }
};

const answerSQ = async (req, res, next) => {
  try {
    let value;
    const token = req.params.token;

    jwt.verify(String(token), process.env.JWT, (err, user) => {
      if (err) return next(handleError(400, "Token Expired"));

      value = user;
    });

    const user = await User.findById(value.id);

    if (!user) return next(handleError(400, "user does not exist"));

    const data = await User.findOneAndUpdate(
      { _id: req.params.id },
      { verified: "asq" },
      { new: true }
    );
    res.status(200).json({ success: true, user });
  } catch (error) {
    next(error);
  }
};

const logOut = async (req, res, next) => {
  try {
    const user = await User.findOne({ email: req.user.email });

    if (!user) return next(handleError(404, "User does not exist."));

    if (!user.dhid) return next(handleError(404, "This email is Invalid."));

    res.status(200).json({
      success: true,
      msg: `${user.kodeHex} , Log out was successfull`,
    });
  } catch (error) {
    next(handleError(500, "Oops, something went wrong"));
  }
};

//Forgot-Password API
const forgotPassword = async (req, res, next) => {
  try {
    const user = await User.findOne({ email: req.body.email });

    if (!user) return next(handleError(404, "This user does not exist."));

    const payload = {
      id: user._id,
    };

    const token = jwt.sign(payload, process.env.JWT, { expiresIn: "5m" });

    resetPassword(user.email, user.firstname, user.kodeHex, token);

    const data = await User.findOneAndUpdate(
      { _id: req.params.id },
      { verified: "fp" },
      { new: true }
    );

    res.status(200).json({
      success: true,
      msg: `Hey ${user.kodeHex} Check your email and reset password`,
      token,
    });
  } catch (error) {
    console.log(error);
    next(handleError(500, "Oops, something went wrong"));
  }
};

// Verify reset password token
const verifyToken = async (req, res, next) => {
  try {
    const token = req.params.token;

    jwt.verify(String(token), process.env.JWT, (err, user) => {
      if (err) return next(handleError(400, "Token Expired"));

      if (user) {
        res.redirect(`https://ardilla-web.netlify.app/set-password/${user.id}`);
      } else {
        next(handleError(400, "Not allowed"));
      }
    });
  } catch (error) {
    next(error);
  }
};

//Reset Password
const resetPasswordAPI = async (req, res, next) => {
  try {
    const { id } = req.params;

    const user = await User.findById(id);

    if (!user) return next(handleError(404, "User does not exist."));

    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(req.body.password, salt);

    const userData = await User.findByIdAndUpdate(
      { _id: id },
      { $set: { password: hash, verified: "completed" } }
    );

    res.status(200).json({
      success: true,
      msg: `hey ${user.kodeHex} , password reset successfull`,
      data: userData,
    });
  } catch (error) {
    console.log(error);
    next(handleError(500, "Oops, something went wrong"));
  }
};

const selectPin = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { code, confirmCode } = req.body;

    const user = await User.findById(id);

    if (!user) return next(handleError(404, "User does not exist."));

    if (code !== confirmCode)
      return next(handleError(404, `Hey ${user.kodeHex}, password dont match`));

    const userData = await User.findByIdAndUpdate(
      { _id: id },
      { $set: { transactionPin: code } }
    );

    res.status(200).json({
      success: true,
      msg: `Successfull , remeber ${user.kodeHex} don't share you pin with anyone`,
      data: userData,
    });
  } catch (error) {
    console.log(error);
    next(handleError(500, "Oops, something went wrong"));
  }
};

module.exports = {
  sendOTP,
  verifyOTP,
  completeProfile,
  wrongEmail,
  securityQusetion,
  login,
  logOut,
  forgotPassword,
  verifyToken,
  resetPasswordAPI,
  answerSQ,
  refreshToken,
  selectPin,
  wrongContact,
};
