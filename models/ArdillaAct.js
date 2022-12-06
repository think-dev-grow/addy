const mongoose = require("mongoose");

const ArdillaAccountSchema = new mongoose.Schema(
  {
    userID: { type: String },
    sanBalance: { type: Number, default: "0.00" },
    dillaWallet: { type: Number, default: "0.00" },
    totalFunds: { type: Number, default: "0.00" },
    kycPoints: { type: Number, default: 0 },
    badge: { type: String, default: "cadet" },
  },
  { timestamps: true }
);

module.exports = mongoose.model("ArdillaAccount", ArdillaAccountSchema);
