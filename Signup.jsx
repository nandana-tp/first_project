// src/components/Signup.jsx
import {
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  Button,
  Typography,
  Box,
} from "@mui/material";
import { useState } from "react";
import axios from "axios";

export default function Signup({ open, handleClose }) {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [age, setAge] = useState("");
  const [dob, setDob] = useState("");
  const [gender, setGender] = useState("");
  const [msg, setMsg] = useState("");

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5000/api/signup", {
        name,
        email,
        password,
        phone,
        age,
        dob,
        gender,
      });
      setMsg("Signup successful!");
      handleClose();
    } catch (err) {
      setMsg("Signup failed. Try again.");
    }
  };

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>Sign Up</DialogTitle>
      <DialogContent>
        <Box component="form" onSubmit={handleSignup} sx={{ mt: 2 }}>
          <TextField
            label="Name"
            fullWidth
            required
            margin="dense"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <TextField
            label="Email"
            fullWidth
            required
            margin="dense"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <TextField
            label="Password"
            fullWidth
            required
            margin="dense"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <TextField
            label="Phone Number"
            fullWidth
            required
            margin="dense"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
          <TextField
            label="Age"
            fullWidth
            required
            margin="dense"
            type="number"
            value={age}
            onChange={(e) => setAge(e.target.value)}
          />
          <TextField
            label="Date of Birth"
            fullWidth
            required
            margin="dense"
            type="date"
            InputLabelProps={{ shrink: true }}
            value={dob}
            onChange={(e) => setDob(e.target.value)}
          />
          <TextField
            select
            label="Gender"
            fullWidth
            required
            margin="dense"
            value={gender}
            onChange={(e) => setGender(e.target.value)}
            SelectProps={{ native: true }}
          >
            <option value="">Select Gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Other">Other</option>
          </TextField>
          <Typography variant="body2" color="error" sx={{ mt: 1 }}>
            {msg}
          </Typography>
          <Button
            type="submit"
            variant="contained"
            fullWidth
            sx={{ mt: 2 }}
          >
            Register
          </Button>
        </Box>
      </DialogContent>
    </Dialog>
  );
}
