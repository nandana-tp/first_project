const Doctor = require("../models/Doctors");
const bcrypt = require("bcryptjs");

// Login Doctor
const loginDoctor = async (req, res) => {
  const { email, password } = req.body;

  try {
    const doctor = await Doctor.findOne({ email });
    if (!doctor) return res.status(400).json({ msg: "Doctor not found" });

    const isMatch = await bcrypt.compare(password, doctor.password);
    if (!isMatch) return res.status(400).json({ msg: "Incorrect password" });

   return res.status(200).json({
  msg: "Login successful",
  role: "doctor",
  doctor, // send the full doctor object
});

  } catch (err) {
    console.error(err.message);
    res.status(500).json({ msg: "Server error" });
  }
};

// Register Doctor
const registerDoctor = async (req, res) => {
  const { name, email, password, specialty, bio } = req.body;

  try {
    const existing = await Doctor.findOne({ email });
    if (existing) return res.status(400).json({ msg: "Doctor already exists" });

    const hashedPassword = await bcrypt.hash(password, 10);

    const newDoctor = new Doctor({
      name,
      email,
      password: hashedPassword,
      specialty,
      bio, // ✅ Add this line
    });

    await newDoctor.save();
    res.status(201).json({ msg: "Doctor registered successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Server error" });
  }
};


module.exports = { loginDoctor, registerDoctor };
