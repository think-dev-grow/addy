const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
  {
    kodeHex: { type: String, default: "", trim: true },
    email: { type: String, default: "", trim: true },
    firstname: { type: String, default: "", trim: true },
    lastname: { type: String, default: "", trim: true },
    contact: { type: String, default: "", trim: true },
    password: { type: String, default: "", trim: true },
    platform: { type: String, default: "Ardilla" },
    isAdmin: { type: Boolean, default: false },
    logStamp: { type: String, default: "" },
    dhid: { type: String, default: "" },
    uid: { type: String, default: "" },
    securityQusetion: { type: Object },
    ipAddress: { type: String, default: "" },
    verified: { type: String, default: "activated" },
    logDetails: { type: Object },
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", UserSchema);
