const mongoose = require("mongoose");

async function connectDB(url) {
  try {
    await mongoose.connect(url);
    console.log("✅ MongoDB Connected");
  } catch (err) {
    console.error("❌ MongoDB Connection Error:", err.message);
  }
}

module.exports = { connectDB };
