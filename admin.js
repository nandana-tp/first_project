// routes/admin.js
const express = require("express");
const router = express.Router();
const Doctor = require("../models/Doctors");
const Appointment = require("../models/Appointment");

// Get all doctors
router.get("/doctors", async (req, res) => {
  const doctors = await Doctor.find();
  res.json(doctors);
});

// Add doctor
router.post("/doctors", async (req, res) => {
  const doctor = new Doctor(req.body);
  await doctor.save();
  res.json(doctor);
});

// Edit doctor
router.put("/doctor/:id", async (req, res) => {
  await Doctor.findByIdAndUpdate(req.params.id, req.body);
  res.json({ message: "Doctor updated" });
});

// Delete doctor
router.delete("/doctors/:id", async (req, res) => {
  try {
    await Doctor.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Doctor deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: "Failed to delete doctor" });
  }
});
// Get appointments
router.post("/appointments", async (req, res) => {
  try {
    const newAppointment = new Appointment(req.body);
    await newAppointment.save();
    res.status(201).json(newAppointment);
  } catch (err) {
    console.error("Error creating appointment:", err);
    res.status(500).json({ message: "Failed to create appointment" });
  }
});
// routes/admin.js
router.get("/appointments", async (req, res) => {
  try {
    const appointments = await Appointment.find().populate("doctorId", "name specialty");
    res.json(appointments);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch appointments" });
  }
});


// Update appointment
router.put("/appointments/:id", async (req, res) => {
  await Appointment.findByIdAndUpdate(req.params.id, req.body);
  res.json({ message: "Appointment updated" });
});

// Delete appointment
router.delete("/appointments/:id", async (req, res) => {
  await Appointment.findByIdAndDelete(req.params.id);
  res.json({ message: "Appointment cancelled" });
});

module.exports = router;
