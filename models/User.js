const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
  {
    kodeHex: { type: String, default: "", trim: true },
    email: { type: String, default: "", trim: true },
    firstname: { type: String, default: "", trim: true },
    lastname: { type: String, default: "", trim: true },
    contact: { type: String, default: "", trim: true },
    password: { type: String, default: "", trim: true },
    bvn: { type: String, default: "", trim: true },
    platform: { type: String, default: "Ardilla" },
    isAdmin: { type: Boolean, default: false },
    logStamp: { type: Number, default: null },
    dhid: { type: String, default: "" },
    uid: { type: String, default: "" },
    kyc: { type: Object, default: {} },
    kycPoints: { type: Number, default: 0 },
    nextOfKin: { type: Object, default: {} },
    profilePic: { type: String, default: "" },
    securityQusetion: { type: Object },
    ipAddress: { type: String, default: "" },
    verified: { type: String, default: "activated" },
    logDetails: { type: Object },
    transactionPin: { type: String, default: "", trim: true },
    mobilePinId: { type: String, default: "" },
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", UserSchema);
