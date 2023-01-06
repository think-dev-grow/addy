const User = require("../models/User");
const jwt = require("jsonwebtoken");
const handleError = require("../utils/error");
const { fileSizeFormatter } = require("../utils/uploadFile");

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
    // }

    res.status(200).json(fileData);
  } catch (error) {
    next(error);
  }
};

// const { image } = req.body;

// console.log(image);

// const uploadImg = await cloudinary.uploader.upload(
//   image,
//   {
//     upload_preset: "ifaoski1",
//     public_id: `${Date.now()}`,
//     allowed_formats: ["png", "jpg", "jpeg", "svg", "ico", "jfif", "webp"],
//   },
//   function (error, result) {
//     if (error) {
//       console.log(error);
//     }
//     console.log(result);
//   }
// );

// try {
//   res.status(200).json(uploadImg);
// } catch (error) {
//   console.log(error);
// }

// try {
//   const id = req.params.id;

//   const user = await User.findById(id);

//   if (!user) return next(handleError(400, "user does not exist"));

//   await User.findOneAndUpdate(
//     { _id: id },
//     {
//       $set: { profilePic: uploadImg.url },
//     },
//     { new: true }
//   );

//   res.status(200).json({ success: true, msg: "profile pic uploaded" });
// } catch (error) {
//   next(error);
// }

// const profileImage = async (req, res, next) => {
//   try {
//     const id = req.params.id;

//     const { profilePic } = req.body;

//     const user = await User.findById(id);

//     if (!user) return next(handleError(400, "user does not exist"));

//     await User.findOneAndUpdate(
//       { _id: id },
//       {
//         $set: { profilePic: profilePic },
//       },
//       { new: true }
//     );

//     res.status(200).json({ success: true, msg: "profile pic uploaded" });
//   } catch (error) {
//     next(error);
//   }
// };

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

module.exports = { getUser, getUserById, profileImage, nextOfKin };
