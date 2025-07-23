// src/components/Login.jsx
import { useState } from "react";
import {
  Container,
  Box,
  TextField,
  Button,
  Typography,
  Paper,
  Avatar,
  Stack,
} from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [msg, setMsg] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
  e.preventDefault();
  try {
    const res = await axios.post("http://localhost:5000/api/login", {
      email,
      password,
    });

    const { role } = res.data;

    setMsg("Login Successful!");
    if (role === "doctor") {
      navigate("/doctordashboard");
    } else if (role === "patient") {
      navigate("/patient-dashboard");
    }
  } catch (err) {
    setMsg("Login Failed: Invalid credentials.");
  }
};

  return (
    <Container maxWidth="sm">
      <Paper
        elevation={3}
        sx={{
          padding: 4,
          mt: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Avatar sx={{ bgcolor: "primary.main", mb: 2 }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography variant="h5" gutterBottom>
          Hospital Login
        </Typography>
        <Typography variant="body2" color="error" gutterBottom>
          {msg}
        </Typography>

        <Box component="form" onSubmit={handleLogin} sx={{ mt: 2, width: "100%" }}>
          <TextField
            label="Email"
            fullWidth
            margin="normal"
            variant="outlined"
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <TextField
            label="Password"
            fullWidth
            margin="normal"
            variant="outlined"
            type="password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <Stack spacing={2} mt={2}>
            <Button
              type="submit"
              variant="contained"
              fullWidth
              sx={{ backgroundColor: "#1976d2" }}
            >
              Login
            </Button>
            </Stack>

            {/* ✅ View Doctors Button */}
              
        </Box>
      </Paper>
    </Container>
  );
}