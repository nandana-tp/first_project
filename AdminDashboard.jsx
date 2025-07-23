import React, { useState, useEffect } from "react";
import {
  AppBar, Toolbar, Typography, Tabs, Tab, Box, Paper, Grid, Button, Card, CardContent,
  Dialog, DialogTitle, DialogContent, DialogActions, TextField
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { Edit, Delete, PlusCircle } from "lucide-react";
import axios from "../api/axios";

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [tabIndex, setTabIndex] = useState(0);
  const [openAddDoctor, setOpenAddDoctor] = useState(false);
  const [openEditDoctor, setOpenEditDoctor] = useState(false);

  const [doctors, setDoctors] = useState([]);
  const [appointments, setAppointments] = useState([]);
  const [newDoctor, setNewDoctor] = useState({ name: "", specialty: "", image: "", bio: "", email: "", password: "" });
  const [editDoctor, setEditDoctor] = useState(null);
  const [openEditAppointment, setOpenEditAppointment] = useState(false);
  const [selectedAppointment, setSelectedAppointment] = useState(null);

  const handleTabChange = (_, newIndex) => setTabIndex(newIndex);

  useEffect(() => {
    fetchDoctors();
    fetchAppointments();
  }, []);

  const fetchDoctors = async () => {
    try {
      const res = await axios.get("/admin/doctors");
      setDoctors(res.data);
    } catch (err) {
      console.error("Error fetching doctors", err);
    }
  };

  const fetchAppointments = async () => {
    try {
      const res = await axios.get("/admin/appointments");
      setAppointments(res.data);
    } catch (err) {
      console.error("Error fetching appointments", err);
    }
  };

  const handleAddDoctor = async () => {
    try {
      await axios.post("/admin/doctors", newDoctor);
      fetchDoctors();
      setOpenAddDoctor(false);
      setNewDoctor({ name: "", specialty: "", image: "", bio: "", email: "", password: "" });
    } catch (err) {
      console.error("Error adding doctor", err);
    }
  };

  const handleEditDoctorSubmit = async () => {
    try {
      const { _id, ...doctorData } = editDoctor; // exclude _id
      await axios.put(`/admin/doctors/${_id}`, doctorData);
      fetchDoctors();
      setOpenEditDoctor(false);
    } catch (err) {
      console.error("Error updating doctor", err);
    }
  };

  const handleDeleteDoctor = async (id) => {
    const confirm = window.confirm("Are you sure you want to delete this doctor?");
    if (!confirm) return;
    try {
      await axios.delete(`/admin/doctors/${id}`);
      fetchDoctors();
    } catch (err) {
      console.error("Error deleting doctor", err);
    }
  };

  const handleEditAppointment = (appt) => {
    setSelectedAppointment(appt);
    setOpenEditAppointment(true);
  };

  const handleUpdateAppointment = async () => {
    try {
      await axios.put(`/admin/appointments/${selectedAppointment._id}`, selectedAppointment);
      fetchAppointments();
      setOpenEditAppointment(false);
    } catch (err) {
      console.error("Error updating appointment", err);
    }
  };

  const handleDeleteAppointment = async (id) => {
    const confirm = window.confirm("Do you want to cancel this appointment?");
    if (!confirm) return;
    try {
      await axios.delete(`/admin/appointments/${id}`);
      fetchAppointments();
    } catch (err) {
      console.error("Error deleting appointment", err);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("adminToken");
    navigate("/");
  };

  return (
    <Box>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>Admin Dashboard</Typography>
          <Button color="inherit" onClick={() => navigate("/")}>Home</Button>
          <Button color="inherit" onClick={() => navigate("/doctors")}>Doctors</Button>
          <Button color="inherit" onClick={handleLogout}>Logout</Button>
        </Toolbar>
      </AppBar>

      <Box sx={{ p: 3 }}>
        <Tabs value={tabIndex} onChange={handleTabChange} sx={{ mb: 4 }}>
          <Tab label="Appointments" />
          <Tab label="Doctors" />
        </Tabs>

        {tabIndex === 0 && (
          <Box>
            <Typography variant="h5" mb={2} sx={{ color: "#1976d2" }}>Patient Appointments</Typography>
            {appointments.map((appt) => (
              <Paper key={appt._id} sx={{ p: 2, mb: 2 }}>
                <Typography><strong>Patient:</strong> {appt.patientName}</Typography>
                <Typography>
                  Doctor: {appt.doctorId?.name} ({appt.doctorId?.specialty})
                </Typography>
                <Typography><strong>Date:</strong> {appt.date}</Typography>
                <Typography><strong>Time:</strong> {appt.time}</Typography>
                <Typography><strong>Reason:</strong> {appt.reason}</Typography>
                <Button variant="outlined" startIcon={<Edit />} sx={{ mt: 1, mr: 1 }} onClick={() => handleEditAppointment(appt)}>Edit</Button>
                <Button variant="outlined" color="error" startIcon={<Delete />} sx={{ mt: 1 }} onClick={() => handleDeleteAppointment(appt._id)}>Cancel</Button>
              </Paper>
            ))}
          </Box>
        )}

        {tabIndex === 1 && (
          <Box>
            <Typography variant="h5" mb={2} sx={{ color: "#137bbcff" }}>Doctor Profile</Typography>
            <Grid container spacing={3}>
              {doctors.map((doc) => (
                <Grid item xs={12} sm={6} md={4} key={doc._id}>
                  <Card>
                    <CardContent>
                      <Typography variant="h6">{doc.name}</Typography>
                      <Typography variant="subtitle1" color="text.secondary">{doc.email}</Typography>
                      <Typography variant="subtitle1" color="text.secondary">{doc.specialty}</Typography>
                      <Typography variant="body2" color="text.secondary">{doc.bio}</Typography>
                      <Box mt={2}>
                        <Button variant="outlined" startIcon={<Edit />} sx={{ mr: 1 }} onClick={() => { setEditDoctor(doc); setOpenEditDoctor(true); }}>Edit</Button>
                        <Button variant="outlined" color="error" startIcon={<Delete />} onClick={() => handleDeleteDoctor(doc._id)}>Delete</Button>
                      </Box>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
            <Box mt={4}>
              <Button variant="contained" startIcon={<PlusCircle />} onClick={() => setOpenAddDoctor(true)}>Add Doctor</Button>
            </Box>
          </Box>
        )}
      </Box>

      {/* Appointment Edit Dialog */}
      <Dialog open={openEditAppointment} onClose={() => setOpenEditAppointment(false)}>
        <DialogTitle>Edit Appointment</DialogTitle>
        <DialogContent>
          <TextField label="Patient" value={selectedAppointment?.patientName || ''} onChange={e => setSelectedAppointment({ ...selectedAppointment, patientName: e.target.value })} fullWidth margin="dense" />
          <TextField label="Date" value={selectedAppointment?.date || ''} onChange={e => setSelectedAppointment({ ...selectedAppointment, date: e.target.value })} fullWidth margin="dense" />
          <TextField label="Time" value={selectedAppointment?.time || ''} onChange={e => setSelectedAppointment({ ...selectedAppointment, time: e.target.value })} fullWidth margin="dense" />
          <TextField label="Reason" value={selectedAppointment?.reason || ''} onChange={e => setSelectedAppointment({ ...selectedAppointment, reason: e.target.value })} fullWidth margin="dense" />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenEditAppointment(false)}>Cancel</Button>
          <Button variant="contained" onClick={handleUpdateAppointment}>Save Changes</Button>
        </DialogActions>
      </Dialog>

      {/* Add Doctor Dialog */}
      <Dialog open={openAddDoctor} onClose={() => setOpenAddDoctor(false)}>
        <DialogTitle>Add Doctor</DialogTitle>
        <DialogContent>
          <TextField label="Name" value={newDoctor.name} onChange={(e) => setNewDoctor({ ...newDoctor, name: e.target.value })} fullWidth margin="dense" />
          <TextField label="Specialization" value={newDoctor.specialty} onChange={(e) => setNewDoctor({ ...newDoctor, specialty: e.target.value })} fullWidth margin="dense" />
          <TextField label="Email" value={newDoctor.email} onChange={(e) => setNewDoctor({ ...newDoctor, email: e.target.value })} fullWidth margin="dense" />
          <TextField label="Password" type="password" value={newDoctor.password} onChange={(e) => setNewDoctor({ ...newDoctor, password: e.target.value })} fullWidth margin="dense" />
          <TextField label="Bio" value={newDoctor.bio} onChange={(e) => setNewDoctor({ ...newDoctor, bio: e.target.value })} fullWidth multiline rows={3} margin="dense" />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenAddDoctor(false)}>Cancel</Button>
          <Button variant="contained" onClick={handleAddDoctor}>Add</Button>
        </DialogActions>
      </Dialog>

      {/* Edit Doctor Dialog */}
      <Dialog open={openEditDoctor} onClose={() => setOpenEditDoctor(false)}>
        <DialogTitle>Edit Doctor</DialogTitle>
        <DialogContent>
          <TextField label="Name" value={editDoctor?.name || ""} onChange={(e) => setEditDoctor({ ...editDoctor, name: e.target.value })} fullWidth margin="dense" />
          <TextField label="Email" value={editDoctor?.email || ""} onChange={(e) => setEditDoctor({ ...editDoctor, email: e.target.value })} fullWidth margin="dense" />
          <TextField label="Password" type="password" value={editDoctor?.password || ""} onChange={(e) => setEditDoctor({ ...editDoctor, password: e.target.value })} fullWidth margin="dense" />
          <TextField label="Specialization" value={editDoctor?.specialty || ""} onChange={(e) => setEditDoctor({ ...editDoctor, specialty: e.target.value })} fullWidth margin="dense" />
          <TextField label="Bio" value={editDoctor?.bio || ""} onChange={(e) => setEditDoctor({ ...editDoctor, bio: e.target.value })} fullWidth multiline rows={3} margin="dense" />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenEditDoctor(false)}>Cancel</Button>
          <Button variant="contained" onClick={handleEditDoctorSubmit}>Save</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default AdminDashboard;
