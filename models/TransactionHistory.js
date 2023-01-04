const mongoose = require("mongoose");

const TranscactionHistory = new mongoose.Schema({}, { timestamps: true });

module.exports = mongoose.model("TransactionHistory", TranscactionHistory);
