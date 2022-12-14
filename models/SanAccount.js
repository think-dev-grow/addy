const mongoose = require("mongoose");
const randomize = require("randomatic");

const SanAccount = new mongoose.Schema(
  {
    accountName: { type: String },
    accountNumber: { type: String, default: randomize("0", 10) },
    accountBalance: { type: Number, default: 0 },
    userID: { type: String },
    transcactionHistory: { type: Array, default: [] },
  },
  { timestamps: true }
);

module.exports = mongoose.model("SanAccount", SanAccount);
