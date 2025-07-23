// routes/appointment.js
const express = require("express");
const router = express.Router();
const Appointment = require("../models/Appointment");

// Create new appointment (admin)
router.post("/admin", async (req, res) => {
  try {
    const { patientName, doctorId, date, time, reason } = req.body;
    const newAppointment = new Appointment({ patientName, doctorId, date, time, reason });
    await newAppointment.save();
    res.status(201).json({ msg: "Appointment created", appointment: newAppointment });
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Server error" });
  }
});

// Get all appointments (admin dashboard)
router.get("/admin", async (req, res) => {
  try {
    const appointments = await Appointment.find();
    res.status(200).json(appointments);
  } catch (err) {
    res.status(500).json({ msg: "Server error" });
  }
});

// Update appointment by ID
router.put("/admin/:id", async (req, res) => {
  try {
    const updated = await Appointment.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.status(200).json(updated);
  } catch (err) {
    res.status(500).json({ msg: "Error updating" });
  }
});

// Delete appointment by ID
router.delete("/admin/:id", async (req, res) => {
  try {
    await Appointment.findByIdAndDelete(req.params.id);
    res.status(200).json({ msg: "Appointment deleted" });
  } catch (err) {
    res.status(500).json({ msg: "Error deleting" });
  }
});

module.exports = router;
