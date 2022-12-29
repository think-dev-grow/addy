const mongoose = require("mongoose");
const { v4: uuidv4 } = require("uuid");

const SanAccount = new mongoose.Schema(
  {
    accountName: { type: String },
    accountNumber: { type: String, default: uuidv4() },
    accountBalance: { type: Number, default: 0 },
    userID: { type: String },
    transcactionHistory: { type: Array, default: [] },
  },
  { timestamps: true }
);

module.exports = mongoose.model("SanAccount", SanAccount);
