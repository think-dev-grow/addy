const express = require("express");

const {
  createSanAccount,
  getSanAccount,
} = require("../controllers/sanAccount");

const router = express.Router();

router.post("/create-account", createSanAccount);

router.get("/get-san-account/:id", getSanAccount);

module.exports = router;
