import React from "react";
import { Routes, Route } from "react-router-dom";

// Components
import Home from "./components/Home";
import Doctors from "./components/Doctors";
import Login from "./components/Login";
import Signup from "./components/Signup";
import AboutUs from "./components/Aboutus";
import Appointment from "./components/Appointment";
import DoctorDashboard from "./components/DoctorDashboard";
import AdminDashboard from "./components/AdminDashboard";

function App() {
  return (
    <Routes>
      {/* Home handles modal-based Login, Signup, AboutUs, and AdminLogin */}
      <Route path="/" element={<Home />} />

      {/* Optional full-page versions (if needed) */}
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/about" element={<AboutUs />} />

      {/* Main content pages */}
      <Route path="/doctors" element={<Doctors />} />
      <Route path="/appointment" element={<Appointment />} />

      {/* Dashboards */}
      <Route path="/doctordashboard" element={<DoctorDashboard />} />
      <Route path="/admindashboard" element={<AdminDashboard />} /> {/* ✅ Admin Dashboard */}
    </Routes>
  );
}

export default App;