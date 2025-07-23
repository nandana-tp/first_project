// createDoctor.js
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const Doctor = require("./models/Doctor");

mongoose.connect("your_mongo_uri_here").then(async () => {
  const hashedPassword = await bcrypt.hash("yadhu123", 10);
  const doctor = new Doctor({
    name: "Dr. Yadhu",
    email: "yadhu@example.com",
    password: hashedPassword,
    specialty: "Orthopedic Surgeon",
  });

  await doctor.save();
  console.log("✅ Doctor Created");
  mongoose.disconnect();
});
