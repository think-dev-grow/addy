const User = require("../models/User");
const jwt = require("jsonwebtoken");
const handleError = require("../utils/error");
const { fileSizeFormatter } = require("../utils/uploadFile");
const bcrypt = require("bcrypt");
const randomize = require("randomatic");
const asyncHandler = require("express-async-handler");

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

const profileImage = asyncHandler(async (req, res) => {
  // try {
  let fileData = {};

  const id = req.user.id;

  const user = await User.findById(id);

  if (!user) {
    res.status(400);
    throw new Error("User does not exist");
  }

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
  // } catch (error) {
  //   next(error);
  // }
});

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

    res.status(200).json({ fileData, msg: "utility bill  decline " });
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

    res.status(200).json({ fileData, msg: "utility bill approved " });
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

    res.status(200).json({ fileData, msg: "id front decline " });
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

    res.status(200).json({ fileData, msg: "id front approved " });
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

    res.status(200).json({ fileData, msg: "id back decline " });
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

    res.status(200).json({ fileData, msg: "id back approved " });
  } catch (error) {
    next(error);
  }
};

const genrateAccount = async (req, res, next) => {
  try {
    const id = req.params.id;

    const user = await User.findById(id);

    if (!user) return next(handleError(400, "user does not exist"));

    if (
      user.idBackStatus === "approve" &&
      user.idFrontStatus === "approve" &&
      user.utilityBillStatus === "approve"
    ) {
      const accountNumber = randomize("0", 10);

      await User.findOneAndUpdate(
        { _id: id },
        {
          $set: {
            uid: accountNumber,
          },
        },
        { new: true }
      );

      res.status(200).json({
        accountNumber,
        msg: `hey ${user.kodeHex} your account number is ${accountNumber}`,
      });
    }
    // } else {
    //   return next(handleError(400, "finish your Kyc first"));
    // }
  } catch (error) {
    next(error);
  }
};

//Get User
// const getUser = asyncHandler(async (req, res) => {
//   const user = await User.findById(req.user.id);

//   if (!user) {
//     res.status(400);
//     throw new Error("User does not exist.");
//   }

//   const { _id, email, kodeHex } = user;

//   res.status(200).json({
//     success: true,
//     msg: "request successfull",
//     user: {
//       _id,
//       email,
//       kodeHex,
//     },
//   });
// });

// //Update user
// const updateUser = asyncHandler(async (req, res) => {
//   const user = await User.findById(req.user.id);

//   if (!user) {
//     res.status(400);
//     throw new Error("User does not exist.");
//   }

//   const { kodeHex, email, firstname, lastname, contact } = user;

//   user.email = email;
//   user.kodeHex = req.body.kodeHex || kodeHex;
//   user.contact = req.body.contact || contact;
//   user.firstname = req.body.firstname || firstname;
//   user.lastname = req.body.lastname || lastname;

//   await user.save();

//   res.status(200).json({
//     success: true,
//     msg: "Profile updated successfull",
//   });
// });

// //Change Password
// const changePassword = asyncHandler(async (req, res) => {
//   const user = await User.findById(req.user.id);

//   const { oldPassword, password } = req.body;

//   if (!user) {
//     res.status(400);
//     throw new Error("User does not exist.");
//   }

//   if (!oldPassword || !password) {
//     res.status(400);
//     throw new Error("Please add old and new password");
//   }

//   const validPassword = await bcrypt.compare(oldPassword, user.password);

//   if (!validPassword) {
//     res.status(400);
//     throw new Error("Your old password is incorrect");
//   }

//   const salt = await bcrypt.genSalt(10);
//   const hash = bcrypt.hashSync(password, salt);

//   const data = await User.findOneAndUpdate(
//     { _id: req.params.id },
//     { $set: { password: hash } },
//     { new: true }
//   );

//   res.status(200).json({
//     success: true,
//     msg: `password change  successfully`,
//     data,
//   });
// });

// //Set Next of kin
// const nextOfKin = asyncHandler(async (req, res) => {
//   const user = await User.findById(req.user.id);

//   if (!user) {
//     res.status(400);
//     throw new Error("User does not exist.");
//   }

//   const nextOfKinDetails = req.body.nextOfKin;

//   if (!nextOfKinDetails) {
//     res.status(400);
//     throw new Error("Please fill out form correctly.");
//   }

//   const data = await User.findOneAndUpdate(
//     { _id: req.params.id },
//     { $set: { nextOfKin: nextOfKinDetails } },
//     { new: true }
//   );

//   res.status(200).json({
//     success: true,
//     msg: `data uploaded successfully`,
//     data,
//   });
// });

//Change pin
// const changePin = asyncHandler(async (req, res) => {
//   const { pin } = req.body;

//   const user = await User.findById(req.user.id);

//   if (!pin || pin.length < 4 || pin.length > 4) {
//     res.status(400);
//     throw new Error("Please enter a valid pin.");
//   }

//   if (!user) {
//     res.status(400);
//     throw new Error("User does not exist.");
//   }

//   const salt = bcrypt.genSaltSync(10);
//   const hash = bcrypt.hashSync(pin, salt);

//   const data = await User.findOneAndUpdate(
//     { _id: req.params.id },
//     { $set: { transactionPin: hash } },
//     { new: true }
//   );

//   res.status(200).json({
//     success: true,
//     msg: `your pin has been changed`,
//     data,
//   });
// });

module.exports = {
  getUser,
  getUserById,
  profileImage,
  nextOfKin,
  uploadIdFront,
  uploadIdBack,
  uploadUtilityBill,
  // updateUser,
  changePassword,
  changePin,
  declineUtilityBill,
  approveUtility,
  declineIdFront,
  declineIdBack,
  approveIdBack,
  approveIdFront,
  genrateAccount,
};
