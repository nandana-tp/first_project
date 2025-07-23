import React from "react";
import { AppBar, Toolbar, Typography, Button, Stack } from "@mui/material";

const Navbar = ({ onLoginClick, onSignupClick, onAboutUsClick }) => {
  return (
    <AppBar position="static" sx={{ backgroundColor: "#1976d2" }}>
      <Toolbar>
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          V-CARE HOSPITAL
        </Typography>
        <Stack direction="row" spacing={2}>
          <Button color="inherit" onClick={onAboutUsClick}>
            About Us
          </Button>
          <Button color="inherit" onClick={onLoginClick}>
            Login
          </Button>
          <Button color="inherit" onClick={onSignupClick}>
            Signup
          </Button>
        
        </Stack>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;