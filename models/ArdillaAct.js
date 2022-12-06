const mongoose = require("mongoose");

const ArdillaAccountSchema = new mongoose.Schema(
  {
    userID: { type: String },
    sanBalance: { type: Number, default: 0.0 },
    dillaWallet: { type: Number, default: 0.0 },
    totalFunds: { type: Number, default: 0.0 },
    kycPoints: { type: Number, default: 0 },
    badge: { type: String, default: "cadet" },
  },
  { timestamps: true }
);

module.exports = mongoose.model("ArdillaAccount", ArdillaAccountSchema);
