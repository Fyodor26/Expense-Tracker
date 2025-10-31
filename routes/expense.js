const express = require("express");
const router = express.Router();
const Expense = require("../model/expense");

router.post("/add", async (req, res) => {
  if (!req.user) {
    return res.render("index", {
      user: null,
      message: "Please log in first.",
    });
  }
  const { title, amount, category, date } = req.body;

  Expense.create({
    title,
    amount,
    category,
    date,
    user: req.user._id,
  });
  res.redirect("/");
});
router.post("/update", async (req, res) => {
  const { tit, title, amount, category, date } = req.body;
  const expense = await Expense.findOne({ title: tit });
  if (!expense) return res.send("Not found");

  expense.title = title;
  expense.amount = amount;
  expense.category = category;
  expense.date = date;
  await expense.save();
  return res.redirect("update");
});
router.post("/delete", async (req, res) => {
  const { del } = req.body;
  const match = await Expense.findOne({ title: del });
  if (!match) return res.send("Not Found");

  const deleted = await User.deleteOne({ title: del });
  return res.send("Item Deleted Successfully");
});
router.get("/monthly", async (req, res) => {
  const report = await Expense.aggregate([
    {
      $group: {
        _id: { month: { $month: "$date" }, year: { $year: "$date" } },
        totalspent: { $sum: "$amount" },
      },
    },
    { $sort: { "_id.year": -1, "_id.month": -1 } },
  ]);

  const formatted = report.map((r) => ({
    month: `${r._id.month}-${r._id.year}`,
    totalspent: r.totalspent,
  }));

  return res.render("index", {
    user: JSON.stringify(req.user),
    report: formatted,
  });
});
module.exports = router;
