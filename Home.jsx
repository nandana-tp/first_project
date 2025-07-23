import { useState } from "react";
import {
  Container,
  Typography,
  Box,
  Grid,
  Paper,
  Divider,
  Button,
} from "@mui/material";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import ApartmentIcon from "@mui/icons-material/Apartment";
import GroupIcon from "@mui/icons-material/Group";

// Slick carousel imports
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";

// Components
import Navbar from "./Navbar";
import Signup from "./Signup";
import AboutUs from "./Aboutus";
import AdminLogin from "./AdminLogin";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const navigate = useNavigate();

  const [openSignup, setOpenSignup] = useState(false);
  const [openAboutUs, setOpenAboutUs] = useState(false);
  const [openAdminLogin, setOpenAdminLogin] = useState(false);

  const carouselImages = [
    
   
    "src/image/Nurse-putting-patient-into-MRI-machine.jpg",
    "src/image/Hospital-Interior-Design-10.jpg",
    "src/image/Health-Sector-Interior-Design-Firm-in-Bangladesh.jpg",
    "src/image/5 Ways Technology Will Improve Healthcare Industry in 2025.jpg",
  ];

  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    autoplay: true,
    autoplaySpeed: 4000,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
  };

  return (
    <>
      {/* Navbar */}
      <Navbar
        onLoginClick={() => navigate("/login")} // 🔁 Navigate to login page
        onSignupClick={() => setOpenSignup(true)}
        onAboutUsClick={() => setOpenAboutUs(true)}
        onAdminLoginClick={() => setOpenAdminLogin(true)}
      />

      {/* Carousel */}
      <Box sx={{ maxWidth: "100%", overflow: "hidden" }}>
        <Slider {...sliderSettings}>
          {carouselImages.map((img, index) => (
            <Box key={index}>
              <img
                src={img}
                alt={`slide-${index}`}
                style={{
                  width: "100%",
                  maxHeight: "400px",
                  objectFit: "cover",
                }}
              />
            </Box>
          ))}
        </Slider>
      </Box>

      {/* Modals */}
      <Signup open={openSignup} handleClose={() => setOpenSignup(false)} />
      <AboutUs open={openAboutUs} handleClose={() => setOpenAboutUs(false)} />
      <AdminLogin
        open={openAdminLogin}
        handleClose={() => setOpenAdminLogin(false)}
      />

      {/* Main Content */}
      <Container maxWidth="md" sx={{ mt: 4, mb: 4 }}>
        <Divider sx={{ mb: 4 }} />

        {/* Location Section */}
        <Paper elevation={3} sx={{ p: 3, mb: 4 }}>
          <Box display="flex" alignItems="center" mb={2}>
            <LocationOnIcon color="secondary" sx={{ mr: 1 }} />
            <Typography variant="h6" fontWeight="bold">
              Location
            </Typography>
          </Box>
          <Typography variant="body1">
            V-CARE Hospital, Koothattukulam, Kerala, India – 560001
          </Typography>
        </Paper>

        {/* Infrastructure Section */}
        <Paper elevation={3} sx={{ p: 3, mb: 4 }}>
          <Box display="flex" alignItems="center" mb={2}>
            <ApartmentIcon color="success" sx={{ mr: 1 }} />
            <Typography variant="h6" fontWeight="bold">
              Infrastructure
            </Typography>
          </Box>
          <Typography variant="body1" paragraph>
            Our hospital is equipped with 300+ beds, 24x7 emergency care,
            operation theatres, digital diagnostic labs, and modular ICUs.
          </Typography>
          <Typography variant="body1">
            We use the latest healthcare technology to provide advanced
            treatment in Cardiology, Neurology, Oncology, Orthopedics, and
            Pediatrics.
          </Typography>
        </Paper>

        {/* Doctors Section */}
        <Paper elevation={3} sx={{ p: 3 }}>
          <Box display="flex" alignItems="center" mb={2}>
            <GroupIcon color="info" sx={{ mr: 1 }} />
            <Typography variant="h6" fontWeight="bold">
              Our Doctors
            </Typography>
          </Box>

          <Grid container spacing={2}>
            {[
              { name: "Dr. Alan Jibin", dept: "Cardiologist" },
              { name: "Dr. Yadhukrishna Hari", dept: "Orthopedic Surgeon" },
              { name: "Dr. Nandhana Biju", dept: "Pediatrician" },
              { name: "Dr. Nandhana Pradeep", dept: "Neurologist" },
            ].map((doc, index) => (
              <Grid item xs={12} sm={6} md={6} key={index}>
                <Paper
                  elevation={1}
                  sx={{ p: 2, backgroundColor: "#f9f9f9", height: "100%" }}
                >
                  <Typography variant="subtitle1" fontWeight="bold">
                    {doc.name}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {doc.dept}
                  </Typography>
                </Paper>
              </Grid>
            ))}
          </Grid>
        </Paper>
      </Container>

      {/* Footer with Admin Login */}
      <Box
        component="footer"
        sx={{
          mt: 6,
          py: 2,
          textAlign: "center",
          backgroundColor: "#f5f5f5",
          borderTop: "1px solid #ddd",
        }}
      >
        <Typography variant="body2" color="text.secondary">
          © 2025 V-CARE Hospital. All rights reserved.
        </Typography>
        <Button
          size="small"
          sx={{ mt: 1, fontSize: "0.75rem", textTransform: "none" }}
          onClick={() => setOpenAdminLogin(true)}
        >
          Admin Login
        </Button>
      </Box>
    </>
  );
}
