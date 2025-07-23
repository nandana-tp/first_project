const mongoose = require("mongoose");

const PrescriptionSchema = new mongoose.Schema({
  doctorId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  patientName: String,
  prescription: String,
  date: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Prescription", PrescriptionSchema);
