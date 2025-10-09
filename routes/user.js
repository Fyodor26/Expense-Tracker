const express = require("express");
const router = express.Router();
const User = require("../model/user");
const { generateToken, verifyToken } = require("../service/authentication");

const bcrypt = require("bcrypt");

router.get("/signup", (req, res) => {
  return res.render("signup");
});
router.get("/login", (req, res) => {
  return res.render("login");
});

router.post("/signup", async (req, res) => {
  const { name, email, password } = req.body;

  const passwordHash = await bcrypt.hash(password, 10);
  await User.create({ name, email, passwordHash });

  res.redirect("/");
});

router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  if (!user) return res.send("User not found");
  const isPasswordCorrect = await bcrypt.compare(password, user.passwordHash);
  if (!isPasswordCorrect) return res.send("Invalid password");

  const token = generateToken(user);
  res.cookie("token", token);
  return res.render("index", {
    user,
  });
});

module.exports = router;
