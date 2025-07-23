import React from "react";
import {
  Container,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Typography,
  CardActionArea,
  Paper,
  Button,
  Box,
  AppBar,
  Toolbar,
  Stack,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

// Import local images
import doctor1 from "../image/alan (2).jpg";
import doctor2 from "../image/YADHU.JPG";

const doctors = [
  {
    name: "Dr. Alan Jibin",
    specialty: "Cardiologist",
    image: doctor1,
    bio: "Specialist in interventional cardiology with over 15 years of experience.",
  },
  {
    name: "Dr. Yadhukrishna Hari",
    specialty: "Orthopedic Surgeon",
    image: doctor2,
    bio: "Expert in trauma and joint replacement surgeries.",
  },
  {
    name: "Dr. Nandhana Biju",
    specialty: "Pediatrician",
    image: "src/image/WhatsApp Image 2025-07-12 at 13.42.13_3eee2df8.jpg",
    bio: "Focused on child wellness, immunization, and growth monitoring.",
  },
  {
    name: "Dr. Nandhana Pradeep",
    specialty: "Neurologist",
    image: "src/image/WhatsApp Image 2025-07-12 at 13.42.12_a1a785ef.jpg",
    bio: "Experienced in treating epilepsy, stroke, and neurodegenerative disorders.",
  },
];

export default function Doctors() {
  const navigate = useNavigate();

  return (
    <>
      {/* ✅ Navbar */}
      <AppBar position="static" sx={{ backgroundColor: "#1976d2" }}>
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            V-CARE HOSPITAL
          </Typography>
          <Stack direction="row" spacing={2}>
            <Button color="inherit" onClick={() => navigate("/")}>
              Home
            </Button>
            <Button color="inherit" onClick={() => navigate("/appointment")}>
              Appointment
            </Button>
            
          </Stack>
        </Toolbar>
      </AppBar>

      {/* ✅ Doctors Section */}
      <Container sx={{ mt: 9 }}>
        <Paper elevation={8} sx={{ p: 6 }}>
          <Typography variant="h4" fontWeight="bold" mb={4} textAlign="center">
            Meet Our Doctors
          </Typography>

          {/* ✅ About the Doctors (Outside Grid) */}
          <Box mb={6} textAlign="center">
            <Typography variant="body1" color="text.secondary" sx={{ maxWidth: 800, mx: "auto" }}>
              Our team of doctors at V-CARE HOSPITAL are specialists in their respective fields,
              dedicated to providing compassionate, patient-centered care using the latest in medical technology and evidence-based practices.
              Each doctor brings a wealth of experience to ensure our patients receive the highest standard of healthcare.
            </Typography>
          </Box>

          {/* ✅ Doctor Cards Grid */}
          <Grid container spacing={13}>
            {doctors.map((doctor, index) => (
              <Grid item xs={12} sm={6} md={4} key={index}>
                <Card elevation={3}>
                  <CardActionArea>
                    <CardMedia
                      component="img"
                      height="450"
                      image={doctor.image}
                      alt={doctor.name}
                    />
                    <CardContent>
                      <Typography gutterBottom variant="h6" fontWeight="bold">
                        {doctor.name}
                      </Typography>
                      <Typography variant="subtitle1" color="text.secondary">
                        {doctor.specialty}
                      </Typography>
                      <Typography
                        variant="body2"
                        color="text.secondary"
                        sx={{ mt: 1 }}
                      >
                        {doctor.bio}
                      </Typography>
                    </CardContent>
                  </CardActionArea>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Paper>
      </Container>
    </>
  );
}
