const { log } = require("console");
const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const app = express();
const Expense = require("./model/expense");
const expenseRoute = require("./routes/expense");
const userRoute = require("./routes/user");
const { connectDB } = require("./connection");
const { checkAuthentication } = require("./middlewares/authentication");
const cookieParser = require("cookie-parser");

connectDB("mongodb://127.0.0.1:27017/Expense-Tracker")
  .then(() => {
    "Connected to MongoDb";
  })
  .catch((err) => {
    console.log("Error", err);
  });

app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));
app.use(cookieParser());
app.use(checkAuthentication("token"));
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use("/", expenseRoute);
app.use("/", userRoute);

app.get("/", (req, res) => {
  return res.render("index", {
    user: JSON.stringify(req.user),
  });
});

app.get("/viewAll", async (req, res) => {
  const allExpense = await Expense.find({ user: req.user._id });
  const category = await Expense.aggregate([
    { $match: { user: new mongoose.Types.ObjectId(req.user._id) } },
    {
      $group: {
        _id: "$category",
        totalexpense: { $sum: "$amount" },
      },
    },
  ]);

  return res.render("viewxpense", { category, allExpense });
});

app.get("/update", (req, res) => {
  return res.render("update");
});

app.get("/delete", (req, res) => {
  return res.render("delete");
});

app.get("/logout", async (req, res) => {
  res.clearCookie("token");
  res.redirect("/");
});

app.listen(3000, () => {
  console.log("Listening on port 3000");
});
