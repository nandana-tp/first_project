import React, { useState } from "react";
import {
  Container,
  Grid,
  Paper,
  Typography,
  List,
  ListItem,
  ListItemText,
  TextField,
  Button,
  Box,
  Divider,
  Tabs,
  Tab,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

const mockAppointments = [
  { id: 1, patient: "Rajesh", date: "2025-07-24", time: "10:00 AM" },
  { id: 2, patient: "Hariharasoodhan", date: "2025-07-24", time: "2:30 PM" },
  {id: 3, patient: "elsa elizabath issac", date: "2025-07-24", time: "13:00 " },
];

const mockRecords = [
  {
    patient: "Rajesh",
    date: "2025-06-12",
    diagnosis: "Aortic atherosclerosis",
    treatment: "Statins, lifestyle modification",
    notes: "Patient advised regular follow-up.",
  },
  {
    patient: "Hariharasoodhan",
    date: "2025-05-01",
    diagnosis: "Minor heart attack",
    treatment: "Beta blockers, low salt diet",
    notes: "Patient under long-term cardiac care.",
  },
  {
    patient: "elsa elizabath issac",
    date: "2025-07-24", 
    diagnosis: "Chest pain, fatigue",
    treatment: "Cardiac evaluation, stress test",
    notes: "Patient advised to monitor symptoms closely.",
  }
];

const mockPrescriptions = [
  {
    patient: "Rajesh",
    date: "2025-06-12",
    prescription: "Aspirin 75mg, Atorvastatin 20mg, ECG after 1 month",
  },
  {
    patient: "Hariharasoodhan",
    date: "2025-05-01",
    prescription: "Metoprolol 50mg, Ramipril 5mg, blood test in 2 weeks",
  },
];

export default function DoctorDashboard() {
  const navigate = useNavigate();
  const [selectedTab, setSelectedTab] = useState(0);
  const [selectedPatient, setSelectedPatient] = useState(null);

  const [diagnosis, setDiagnosis] = useState("");
  const [treatment, setTreatment] = useState("");
  const [notes, setNotes] = useState("");
  const [prescription, setPrescription] = useState("");

  const [records, setRecords] = useState(mockRecords);
  const [prescriptions, setPrescriptions] = useState(mockPrescriptions);

  const handleTabChange = (_, newValue) => {
    setSelectedTab(newValue);
  };

  const handleAppointmentClick = (appt) => {
    setSelectedPatient(appt);
    setSelectedTab(1); // Go to Patient Record
  };

  const handleSaveRecord = () => {
    const newRecord = {
      id: records.length + 1,
      patient: selectedPatient.patient,
      date: selectedPatient.date,
      diagnosis,
      treatment,
      notes,
    };
    setRecords([...records, newRecord]);
    setDiagnosis("");
    setTreatment("");
    setNotes("");
    setSelectedTab(3); // Go to Prescription tab
  };

  const handleSavePrescription = () => {
    const newPrescription = {
      id: prescriptions.length + 1,
      patient: selectedPatient.patient,
      date: selectedPatient.date,
      prescription,
    };
    setPrescriptions([...prescriptions, newPrescription]);
    setPrescription("");
    setSelectedPatient(null);
    setSelectedTab(0); // Back to Appointments
  };

  const handleLogout = () => {
    localStorage.removeItem("doctor");
    navigate("/");
  };

  return (
    <Container maxWidth="md" sx={{ mt: 4 }}>
      <Paper elevation={3} sx={{ p: 4 }}>
        <Typography variant="h4" fontWeight="bold" mb={3} textAlign="center">
          Doctor Dashboard
        </Typography>

        <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
          <Typography variant="h6">Welcome, Dr. Alan Jibin</Typography>
          <Button variant="outlined" color="error" onClick={handleLogout}>
            Logout
          </Button>
        </Box>

        <Tabs value={selectedTab} onChange={handleTabChange} centered>
          <Tab label="Appointments" />
          <Tab label="Patient Record" />
          <Tab label="Add Diagnosis" />
          <Tab label="e-Prescriptions" />
        </Tabs>

        <Divider sx={{ my: 3 }} />

        {/* Appointments */}
        {selectedTab === 0 && (
          <Box>
            <Typography variant="h6" mb={2}>
              Upcoming Appointments
            </Typography>
            <List>
              {mockAppointments.map((appt) => (
                <ListItem
                  key={appt.id}
                  divider
                  button
                  onClick={() => handleAppointmentClick(appt)}
                >
                  <ListItemText
                    primary={`${appt.patient} - ${appt.date}`}
                    secondary={`Time: ${appt.time}`}
                  />
                </ListItem>
              ))}
            </List>
          </Box>
        )}

        {/* Patient Records */}
        {selectedTab === 1 && (
          <Box>
            <Typography variant="h6" mb={2}>
              Medical History for {selectedPatient?.patient}
            </Typography>
            <List>
              {records
                .filter((r) => r.patient === selectedPatient?.patient)
                .map((entry, index) => (
                  <ListItem key={index} divider>
                    <ListItemText
                      primary={`Date: ${entry.date}`}
                      secondary={`Diagnosis: ${entry.diagnosis} | Notes: ${entry.notes}`}
                    />
                  </ListItem>
                ))}
            </List>
            <Button sx={{ mt: 2 }} variant="contained" onClick={() => setSelectedTab(2)}>
              Add Diagnosis
            </Button>
          </Box>
        )}

        {/* Add Diagnosis */}
        {selectedTab === 2 && (
          <Box component="form" onSubmit={(e) => e.preventDefault()}>
            <Typography variant="h6" mb={2}>
              Add Diagnosis for {selectedPatient?.patient}
            </Typography>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  label="Diagnosis"
                  fullWidth
                  value={diagnosis}
                  onChange={(e) => setDiagnosis(e.target.value)}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  label="Treatment"
                  fullWidth
                  value={treatment}
                  onChange={(e) => setTreatment(e.target.value)}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  label="Notes"
                  multiline
                  rows={4}
                  fullWidth
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                />
              </Grid>
              <Grid item xs={12}>
                <Button variant="contained" onClick={handleSaveRecord}>
                  Save & Go to Prescription
                </Button>
              </Grid>
            </Grid>
          </Box>
        )}

        {/* Prescriptions */}
        {selectedTab === 3 && (
          <Box>
            <Typography variant="h6" mb={2}>
              Write e-Prescription for {selectedPatient?.patient}
            </Typography>
            <TextField
              label="Prescription"
              multiline
              rows={5}
              fullWidth
              value={prescription}
              onChange={(e) => setPrescription(e.target.value)}
            />
            <Button sx={{ mt: 2 }} variant="contained" onClick={handleSavePrescription}>
              Submit Prescription
            </Button>
          </Box>
        )}
      </Paper>
    </Container>
  );
}
