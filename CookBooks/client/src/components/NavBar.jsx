import React, { useState, useEffect } from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import BookIcon from '@mui/icons-material/Book';
import { useNavigate } from "react-router-dom";
import { useTheme } from "@mui/material/styles";
import { useSelector } from "react-redux";

const Navbar = () => {
  const navigate = useNavigate();
  const theme = useTheme();
  const user = useSelector((state) => state.auth.user);

  const handleLogout = () => {
    localStorage.removeItem("token"); // Clear the token
    navigate("/login"); // Redirect to login
  };

  return (
    <AppBar
      position="static"
      sx={{
        backgroundColor: theme.palette.secondary.main, // Use secondary.main for backgroundxq
        color: theme.palette.secondary.contrastText, // Use secondary.contrastText for text
        boxShadow: "none", // Optional: Remove shadow for a flat look
      }}
    >
      <Toolbar>
        {/* Menu Icon for mobile */}
        <IconButton
          edge="start"
          color="inherit"
          aria-label="menu"
          //sx={{ mr: 2 }}
        >
          <BookIcon />
        </IconButton>

        {/* Logo or Title */}
        <Typography
          variant="h6"
          component="div"
          sx={{ flexGrow: 1, }}
          onClick={() => navigate("/")}
          style={{ cursor: "pointer", fontWeight: "700" }}
        >
          Cookbooks
        </Typography>
        {/* Conditional Login/Logout */}
        {localStorage.getItem("token") ? (
          <Button 
            color="inherit" 
            onClick={handleLogout}>
            Logout
          </Button>
        ) : (
          <Button 
            color="inherit" 
            onClick={() => navigate("/login")}
          >
            Login
          </Button>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
