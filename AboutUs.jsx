import React from "react";
import {
  Container,
  Typography,
  Grid,
  Card,
  CardMedia,
  CardContent,
  Divider,
  Box,
  Paper,
} from "@mui/material";

const hospitalImages = [
   "src/image/stock-photo-modern-hospital-style-building-212251981.jpg", // building
  "src/image/Health-Sector-Interior-Design-Firm-in-Bangladesh.jpg", // ICU
  "src/image/Hospital-Interior-Design-10.jpg", // corridor
];

const machineImages = [
  "src/image/Nurse-putting-patient-into-MRI-machine.jpg", // MRI
  "src/image/surgery-room.png", // CT
  "src/image/unnamed.png", // Operating room
];

const AboutUs = () => {
  return (
    <Container sx={{ mt: 5, mb: 5 }}>
      <Typography variant="h4" gutterBottom fontWeight="bold" textAlign="center">
        WELCOME TO V-CARE HOSPITAL
      </Typography>

      <Typography variant="body1" sx={{ mb: 4 }} textAlign="justify">
        Established in 1998, WE CARE HOSPITAL is a leading multispecialty hospital located in Koothattukulam, Kerala. 
        We are committed to providing world-class healthcare at affordable prices. Our team of renowned doctors, modern facilities, and patient-centric care makes us one of the most trusted names in healthcare.
      </Typography>

      <Divider sx={{ my: 4 }} />

      {/* Infrastructure */}
      <Paper sx={{ p: 3, mb: 4 }} elevation={2}>
        <Typography variant="h5" fontWeight="bold" gutterBottom>
          Infrastructure
        </Typography>
        <Typography>
          Our hospital boasts over 300 beds, including ICU, NICU, and isolation wards. It is equipped with modular operation theatres, 
          digital imaging systems, telemedicine facilities, and advanced diagnostic laboratories.
        </Typography>
      </Paper>

      {/* Departments */}
      <Paper sx={{ p: 3, mb: 4 }} elevation={2}>
        <Typography variant="h5" fontWeight="bold" gutterBottom>
          Departments
        </Typography>
        <Typography>
          We have specialized departments in Cardiology, Neurology, Oncology, Orthopedics, Pediatrics, Gynecology, and General Medicine.
        </Typography>
      </Paper>

      {/* Facilities */}
      <Paper sx={{ p: 3, mb: 4 }} elevation={2}>
        <Typography variant="h5" fontWeight="bold" gutterBottom>
          Facilities
        </Typography>
        <Typography>
          24x7 Emergency Care, Ambulance Services, Blood Bank, Pharmacy, Cafeteria, In-Patient Suites, Health Packages, and Online Consultation.
        </Typography>
      </Paper>

      {/* Gallery - Hospital */}
      <Typography variant="h5" fontWeight="bold" gutterBottom>
        Our Hospital Premises
      </Typography>
      <Grid container spacing={15} sx={{ mb: 9 }}>
        {hospitalImages.map((img, index) => (
          <Grid item xs={18} sm={88} md={55} key={index}>
            <Card>
              <CardMedia component="img" height="180" width="300" image={img} alt="Hospital" />
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Gallery - Machines */}
      <Typography variant="h5" fontWeight="bold" gutterBottom>
        Medical Equipment & Technology
      </Typography>
      <Grid container spacing={15}>
        {machineImages.map((img, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <Card>
              <CardMedia component="img" height="180" width="300" image={img} alt="Machines" />
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default AboutUs;