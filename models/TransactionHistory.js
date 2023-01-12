const mongoose = require("mongoose");

const TransactionHistory = new mongoose.Schema(
  {
    transactionAmount: { type: Number },
    transactionStatus: { type: String },
    transactionDate: { type: String },
    transactionDestination: { type: String },
    transactionType: { type: String },
    userId: { type: String },
  },
  { timestamps: true }
);

module.exports = mongoose.model("TransactionHistory", TransactionHistory);
