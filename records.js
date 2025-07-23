// routes/appointment.js (or routes/medicalRecord.js if separated)
const express = require("express");
const router = express.Router();
const Appointment = require("../models/Appointment");
const MedicalRecord = require("../models/MedicalRecord");

router.post("/appointments/:id/record", async (req, res) => {
  const { id } = req.params;
  const { diagnosis, treatment, notes, prescription } = req.body;

  try {
    // Save medical record
    const medicalRecord = new MedicalRecord({
      appointmentId: id,
      diagnosis,
      treatment,
      notes,
      prescription,
    });

    await medicalRecord.save();

    // Link record to appointment & mark as completed
    const appointment = await Appointment.findById(id);
    if (!appointment) {
      return res.status(404).json({ message: "Appointment not found" });
    }

    appointment.medicalRecord = medicalRecord._id;
    appointment.isCompleted = true; // ✅ Mark as completed
    await appointment.save();

    res.status(200).json({ message: "Record saved and appointment marked as completed" });
  } catch (error) {
    console.error("Error saving record:", error);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
