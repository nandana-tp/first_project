import React, { useState, useEffect } from "react";
import {
  Container,
  Paper,
  Typography,
  TextField,
  MenuItem,
  Button,
  Grid,
  Box,
} from "@mui/material";
import EventAvailableIcon from "@mui/icons-material/EventAvailable";
import axios from "../api/axios";

export default function Appointment() {
  const [appointmentData, setAppointmentData] = useState({
    name: "",
    email: "",
    date: "",
    doctorId: "",
    slot: "",
  });

  const [doctors, setDoctors] = useState([]);
  const [availableSlots, setAvailableSlots] = useState({ forenoon: [], afternoon: [] });

  useEffect(() => {
    axios.get("/doctors")
      .then((res) => setDoctors(res.data))
      .catch(console.error);
  }, []);

  useEffect(() => {
    if (appointmentData.doctorId && appointmentData.date) {
      axios
        .get(`/doctors/${appointmentData.doctorId}/slots`, {
          params: { date: appointmentData.date },
        })
        .then((res) => setAvailableSlots(res.data || { forenoon: [], afternoon: [] }))
        .catch(console.error);
    }
  }, [appointmentData.doctorId, appointmentData.date]);

  const handleChange = (e) => {
    setAppointmentData({
      ...appointmentData,
      [e.target.name]: e.target.value,
      ...(e.target.name === "doctorId" || e.target.name === "date" ? { slot: "" } : {}),
    });
  };

  const handleSlotSelect = (slot) => {
    setAppointmentData((prev) => ({ ...prev, slot }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Appointment Booked:", appointmentData);
    alert("Appointment successfully booked!");
    setAppointmentData({
      name: "",
      email: "",
      date: "",
      doctorId: "",
      slot: "",
    });
    setAvailableSlots({ forenoon: [], afternoon: [] });
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 5 }}>
      <Paper elevation={3} sx={{ p: 4 }}>
        <Box textAlign="center" mb={3}>
          <EventAvailableIcon sx={{ fontSize: 40, color: "primary.main" }} />
          <Typography variant="h5" fontWeight="bold" mt={1}>
            Book an Appointment
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Choose your preferred doctor and time slot.
          </Typography>
        </Box>

        <form onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                label="Full Name"
                name="name"
                fullWidth
                required
                value={appointmentData.name}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Email"
                name="email"
                type="email"
                fullWidth
                required
                value={appointmentData.email}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Preferred Date"
                name="date"
                type="date"
                fullWidth
                required
                InputLabelProps={{ shrink: true }}
                value={appointmentData.date}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                select
                label="Select Doctor"
                name="doctorId"
                fullWidth
                required
                value={appointmentData.doctorId}
                onChange={handleChange}
              >
                {doctors.map((doc) => (
                  <MenuItem key={doc._id} value={doc._id}>
                    {doc.name} - {doc.department}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>

            {(availableSlots.forenoon.length > 0 || availableSlots.afternoon.length > 0) && (
              <>
                <Grid item xs={12}>
                  <Typography variant="subtitle1">Available Time Slots</Typography>
                </Grid>

                {availableSlots.forenoon.length > 0 && (
                  <>
                    <Grid item xs={12}><strong>Forenoon</strong></Grid>
                    {availableSlots.forenoon.map((slot) => (
                      <Grid item key={slot}>
                        <Button
                          variant={appointmentData.slot === slot ? "contained" : "outlined"}
                          onClick={() => handleSlotSelect(slot)}
                        >
                          {slot}
                        </Button>
                      </Grid>
                    ))}
                  </>
                )}

                {availableSlots.afternoon.length > 0 && (
                  <>
                    <Grid item xs={12}><strong>Afternoon</strong></Grid>
                    {availableSlots.afternoon.map((slot) => (
                      <Grid item key={slot}>
                        <Button
                          variant={appointmentData.slot === slot ? "contained" : "outlined"}
                          onClick={() => handleSlotSelect(slot)}
                        >
                          {slot}
                        </Button>
                      </Grid>
                    ))}
                  </>
                )}
              </>
            )}

            <Grid item xs={12}>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                disabled={!appointmentData.slot}
              >
                Book Appointment
              </Button>
            </Grid>
          </Grid>
        </form>
      </Paper>
    </Container>
  );
}
