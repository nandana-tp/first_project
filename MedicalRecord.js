const mongoose = require("mongoose");

const medicalRecordSchema = new mongoose.Schema({
  doctorId: { type: mongoose.Schema.Types.ObjectId, ref: "Doctor" },
  appointmentId: { type: mongoose.Schema.Types.ObjectId, ref: "Appointment" },
  patientId: { type: mongoose.Schema.Types.ObjectId, ref: "Patient" },
  diagnosis: String,
  treatment: String,
  notes: String,
  prescription: String,
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("MedicalRecord", medicalRecordSchema);
