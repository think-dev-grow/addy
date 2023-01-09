const User = require("../models/User");
const jwt = require("jsonwebtoken");
const handleError = require("../utils/error");
const { fileSizeFormatter } = require("../utils/uploadFile");
const bcrypt = require("bcrypt");
const randomize = require("randomatic");

const cloudinary = require("cloudinary").v2;

cloudinary.config({
  cloud_name: "domthgc9v",
  api_key: "382674119878141",
  api_secret: "FAupYcLySkHxYuVyF5J36UTy2y0",
});

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

const profileImage = async (req, res, next) => {
  try {
    let fileData = {};

    const id = req.params.id;

    const user = await User.findById(id);

    if (!user) return next(handleError(400, "user does not exist"));

    // if (req.file) {
    let uploadedFile = await cloudinary.uploader.upload(req.file.path, {
      folder: "Profile Pic",
      resource_type: "image",
    });

    fileData = {
      fileName: req.file.originalname,
      filePath: uploadedFile.secure_url,
      fileType: req.file.mimetype,
      fileSize: fileSizeFormatter(req.file.size, 2),
    };

    await User.findOneAndUpdate(
      { _id: id },
      {
        $set: { profilePic: uploadedFile.secure_url },
      },
      { new: true }
    );

    res.status(200).json({ fileData, msg: "picture uploaded successfully" });
  } catch (error) {
    next(error);
  }
};

const nextOfKin = async (req, res, next) => {
  try {
    const check = await User.findById(req.params.id);

    if (!check) return next(handleError(404, "User does not exist."));

    const nextOfKinDetails = req.body.nextOfKin;

    const data = await User.findOneAndUpdate(
      { _id: req.params.id },
      { $set: { nextOfKin: nextOfKinDetails } },
      { new: true }
    );

    res.status(200).json({
      success: true,
      msg: `data uploaded successfully`,
      data,
    });
  } catch (error) {
    next(error);
  }
};

const changePassword = async (req, res, next) => {
  try {
    const { oldPassword, password } = req.body;

    const check = await User.findById(req.params.id);

    if (!check) return next(handleError(404, "User does not exist."));

    const validPassword = await bcrypt.compare(oldPassword, check.password);

    if (!validPassword)
      return next(handleError(404, "old password don't math"));

    const salt = await bcrypt.genSalt(10);

    const hash = bcrypt.hashSync(password, salt);

    const data = await User.findOneAndUpdate(
      { _id: req.params.id },
      { $set: { password: hash } },
      { new: true }
    );

    res.status(200).json({
      success: true,
      msg: `password change  successfully`,
      data,
    });
  } catch (error) {
    next(error);
  }
};

const changePin = async (req, res, next) => {
  try {
    const { pin } = req.body;

    const check = await User.findById(req.params.id);

    if (!check) return next(handleError(404, "User does not exist."));

    const data = await User.findOneAndUpdate(
      { _id: req.params.id },
      { $set: { transactionPin: pin } },
      { new: true }
    );

    res.status(200).json({
      success: true,
      msg: `your pin has been changed`,
      data,
    });
  } catch (error) {
    next(error);
  }
};

const uploadIdFront = async (req, res, next) => {
  try {
    let fileData = {};

    const id = req.params.id;

    const user = await User.findById(id);

    if (!user) return next(handleError(400, "user does not exist"));

    let uploadedFile = await cloudinary.uploader.upload(req.file.path, {
      folder: "kyc",
      resource_type: "image",
    });

    fileData = {
      fileName: req.file.originalname,
      filePath: uploadedFile.secure_url,
      fileType: req.file.mimetype,
      fileSize: fileSizeFormatter(req.file.size, 2),
    };

    await User.findOneAndUpdate(
      { _id: id },
      {
        $set: {
          kyc: { ...user.kyc, idFront: uploadedFile.secure_url },
          idFrontStatus: "pending",
        },
      },
      { new: true }
    );

    res.status(200).json({ fileData, msg: "uploaded successfully " });
  } catch (error) {
    next(error);
  }
};

const uploadIdBack = async (req, res, next) => {
  try {
    let fileData = {};

    const id = req.params.id;

    const user = await User.findById(id);

    if (!user) return next(handleError(400, "user does not exist"));

    // if (req.file) {
    let uploadedFile = await cloudinary.uploader.upload(req.file.path, {
      folder: "kyc",
      resource_type: "image",
    });

    fileData = {
      fileName: req.file.originalname,
      filePath: uploadedFile.secure_url,
      fileType: req.file.mimetype,
      fileSize: fileSizeFormatter(req.file.size, 2),
    };

    await User.findOneAndUpdate(
      { _id: id },
      {
        $set: {
          kyc: { ...user.kyc, idBack: uploadedFile.secure_url },
          idBackStatus: "pending",
        },
      },
      { new: true }
    );

    res.status(200).json({ fileData, msg: "uploaded successfully " });
  } catch (error) {
    next(error);
  }
};

const uploadUtilityBill = async (req, res, next) => {
  try {
    let fileData = {};

    const id = req.params.id;

    const user = await User.findById(id);

    if (!user) return next(handleError(400, "user does not exist"));

    // if (req.file) {
    let uploadedFile = await cloudinary.uploader.upload(req.file.path, {
      folder: "kyc",
      resource_type: "image",
    });

    fileData = {
      fileName: req.file.originalname,
      filePath: uploadedFile.secure_url,
      fileType: req.file.mimetype,
      fileSize: fileSizeFormatter(req.file.size, 2),
    };

    await User.findOneAndUpdate(
      { _id: id },
      {
        $set: {
          kyc: { ...user.kyc, utilityBill: uploadedFile.secure_url },
          utilityBillStatus: "pending",
        },
      },
      { new: true }
    );

    res.status(200).json({ fileData, msg: "uploaded successfully " });
  } catch (error) {
    next(error);
  }
};

const declineUtilityBill = async (req, res, next) => {
  try {
    const id = req.params.id;

    const user = await User.findById(id);

    if (!user) return next(handleError(400, "user does not exist"));

    await User.findOneAndUpdate(
      { _id: id },
      {
        $set: {
          utilityBillStatus: "decline",
        },
      },
      { new: true }
    );

    res.status(200).json({ fileData, msg: "files was decline " });
  } catch (error) {
    next(error);
  }
};

const approveUtility = async (req, res, next) => {
  try {
    const id = req.params.id;

    const user = await User.findById(id);

    if (!user) return next(handleError(400, "user does not exist"));

    await User.findOneAndUpdate(
      { _id: id },
      {
        $set: {
          utilityBillStatus: "approve",
        },
      },
      { new: true }
    );

    res.status(200).json({ fileData, msg: "files was decline " });
  } catch (error) {
    next(error);
  }
};

const declineIdFront = async (req, res, next) => {
  try {
    const id = req.params.id;

    const user = await User.findById(id);

    if (!user) return next(handleError(400, "user does not exist"));

    await User.findOneAndUpdate(
      { _id: id },
      {
        $set: {
          idFrontStatus: "decline",
        },
      },
      { new: true }
    );

    res.status(200).json({ fileData, msg: "files was decline " });
  } catch (error) {
    next(error);
  }
};

const approveIdFront = async (req, res, next) => {
  try {
    const id = req.params.id;

    const user = await User.findById(id);

    if (!user) return next(handleError(400, "user does not exist"));

    await User.findOneAndUpdate(
      { _id: id },
      {
        $set: {
          idFrontStatus: "approve",
        },
      },
      { new: true }
    );

    res.status(200).json({ fileData, msg: "files was decline " });
  } catch (error) {
    next(error);
  }
};

const declineIdBack = async (req, res, next) => {
  try {
    const id = req.params.id;

    const user = await User.findById(id);

    if (!user) return next(handleError(400, "user does not exist"));

    await User.findOneAndUpdate(
      { _id: id },
      {
        $set: {
          idBackStatus: "decline",
        },
      },
      { new: true }
    );

    res.status(200).json({ fileData, msg: "files was decline " });
  } catch (error) {
    next(error);
  }
};

const approveIdBack = async (req, res, next) => {
  try {
    const id = req.params.id;

    const user = await User.findById(id);

    if (!user) return next(handleError(400, "user does not exist"));

    await User.findOneAndUpdate(
      { _id: id },
      {
        $set: {
          idBackStatus: "approve",
        },
      },
      { new: true }
    );

    res.status(200).json({ fileData, msg: "files was decline " });
  } catch (error) {
    next(error);
  }
};

const genrateAccount = async (req, res, next) => {
  try {
    const id = req.params.id;

    const user = await User.findById(id);

    if (!user) return next(handleError(400, "user does not exist"));

    await User.findOneAndUpdate(
      { _id: id },
      {
        $set: {
          uid: randomize("0", 10),
        },
      },
      { new: true }
    );

    res.status(200).json({ fileData, msg: "files was decline " });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getUser,
  getUserById,
  profileImage,
  nextOfKin,
  uploadIdFront,
  uploadIdBack,
  uploadUtilityBill,
  declineUtilityBill,
  approveUtility,
  declineIdFront,
  declineIdBack,
  approveIdBack,
  approveIdFront,
  genrateAccount,
};
