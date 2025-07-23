const mongoose = require("mongoose");

const doctorSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
  department: String,
  bio: String,
  // ❌ Removed weeklyAvailability since we are using dummy data
});

module.exports = mongoose.model("Doctor", doctorSchema);
