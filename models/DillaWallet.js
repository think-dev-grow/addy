const mongoose = require("mongoose");

const DillaWallet = new mongoose.Schema(
  {
    accountNumber: { type: String },
    accountName: { type: String },
    accountBalance: { type: Number, default: 0 },
    userID: { type: String },
    transcactionHistory: { type: Array, default: [] },
  },
  { timestamps: true }
);

module.exports = mongoose.model("DillaWallet", DillaWallet);
