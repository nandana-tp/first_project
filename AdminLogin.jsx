import React, { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  DialogActions,
  Button,
  Typography,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

const AdminLogin = ({ open, handleClose }) => {
  const navigate = useNavigate(); // ✅ navigation hook
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleAdminLogin = () => {
    // Temporary hardcoded admin validation
    if (email === "admin@vcare.com" && password === "admin123") {
      handleClose(); // close the modal
      navigate("/admindashboard"); // ✅ navigate to admin dashboard
    } else {
      alert("Invalid admin credentials");
    }
  };

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>Admin Login</DialogTitle>
      <DialogContent>
        <TextField
          autoFocus
          margin="dense"
          label="Admin Email"
          type="email"
          fullWidth
          variant="standard"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <TextField
          margin="dense"
          label="Password"
          type="password"
          fullWidth
          variant="standard"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        
        
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        <Button variant="contained" onClick={handleAdminLogin}>
          Login as Admin
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AdminLogin;