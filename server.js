const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const doctorRoutes = require("./routes/doctor");
const appointmentRoutes = require("./routes/appointment");
const adminRoutes = require("./routes/admin");







dotenv.config();
connectDB();

const app = express();
app.use(cors());
app.use(express.json());

// Routes
app.use("/api", require("./routes/auth"));
app.use("/doctors", doctorRoutes);
app.use("/appointments", appointmentRoutes);
app.use("/admin", adminRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
