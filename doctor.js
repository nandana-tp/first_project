const express = require("express");
const bcrypt = require("bcryptjs");
const Doctor = require("../models/Doctors");

const router = express.Router();

// Dummy weekly slots (you can modify this object)
const dummyWeeklySlots = {
  Monday: {
    forenoon: ["10:00 AM", "10:30 AM", "11:00 AM"],
    afternoon: ["02:00 PM", "03:00 PM"]
  },
  Tuesday: {
    forenoon: ["10:00 AM", "11:30 AM"],
    afternoon: ["01:30 PM", "02:30 PM"]
  },
  Wednesday: {
    forenoon: [],
    afternoon: ["03:00 PM", "04:00 PM"]
  },
  Thursday: {
    forenoon: ["10:00 AM", "11:00 AM"],
    afternoon: []
  },
  Friday: {
    forenoon: ["09:30 AM", "10:30 AM"],
    afternoon: ["01:00 PM", "02:00 PM"]
  },
  Saturday: {
    forenoon: [],
    afternoon: []
  },
  Sunday: {
    forenoon: [],
    afternoon: []
  }
};

// ✅ Doctor login
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const doctor = await Doctor.findOne({ email });
    if (!doctor) return res.status(400).json({ msg: "Doctor not found" });

    const isMatch = await bcrypt.compare(password, doctor.password);
    if (!isMatch) return res.status(400).json({ msg: "Invalid credentials" });

    res.status(200).json({
      msg: "Login successful",
      role: "doctor",
      doctor: {
        _id: doctor._id,
        name: doctor.name,
        email: doctor.email,
        specialty: doctor.specialty
      }
    });
  } catch (err) {
    res.status(500).json({ msg: "Server error" });
  }
});

// ✅ Return dummy slots for a selected date
router.get("/:doctorId/slots", async (req, res) => {
  const { date } = req.query;

  try {
    const weekday = new Date(date).toLocaleDateString("en-US", { weekday: "long" });

    const slot = dummyWeeklySlots[weekday];
    if (!slot) return res.status(200).json({ forenoon: [], afternoon: [] });

    res.status(200).json({
      forenoon: slot.forenoon,
      afternoon: slot.afternoon
    });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
});
// routes/doctor.js
router.put("/:id", async (req, res) => {
  try {
    const doctor = await Doctor.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!doctor) return res.status(404).json({ message: "Doctor not found" });
    res.json(doctor);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});


module.exports = router;
