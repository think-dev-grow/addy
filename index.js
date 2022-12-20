const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");
const cookieParser = require("cookie-parser");

const app = express();
app.use(cors());

app.use(cookieParser());

dotenv.config();

//test

const authRoutes = require("./routes/auth");
const userRoutes = require("./routes/user");
const targetPlan = require("./routes/targetPlan");
const flexPlan = require("./routes/flexPlan");
const dillaWallet = require("./routes/dillaWallet");

const connectDB = () => {
  mongoose
    .connect(process.env.MONGO)
    .then(() => console.log("Database connected"))
    .catch((error) => console.log(error));
};

app.use(express.json());

app.use("/ardilla/api/auth", authRoutes);
app.use("/ardilla/api/user", userRoutes);
app.use("/ardilla/api/target-plan", targetPlan);
app.use("/ardilla/api/flex-plan", flexPlan);
app.use("/ardilla/api/dilla-wallet", dillaWallet);

app.use((err, req, res, next) => {
  const status = err.status || 500;
  const msg = err.message || "Something went wrong";

  return res.status(status).json({
    success: false,
    status,
    msg,
  });
});

const PORT = process.env.PORT || 6000;

app.listen(PORT, () => {
  connectDB();
  console.log(`Server works on ${PORT}`);
});
