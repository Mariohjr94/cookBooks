import React from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import { useNavigate } from "react-router-dom";
import { useTheme } from "@mui/material/styles";

const Navbar = () => {
  const navigate = useNavigate();
  const theme = useTheme(); // Access the theme

  const handleLogout = () => {
    localStorage.removeItem("token"); // Clear the token
    navigate("/login"); // Redirect to login
  };

  return (
    <AppBar
      position="static"
      sx={{
        backgroundColor: theme.palette.secondary.main, // Use secondary.main for background
        color: theme.palette.secondary.contrastText, // Use secondary.contrastText for text
        boxShadow: "none", // Optional: Remove shadow for a flat look
      }}
    >
      <Toolbar>
        {/* Menu Icon for mobile */}
        {/* <IconButton
          edge="start"
          color="inherit"
          aria-label="menu"
          sx={{ mr: 2 }}
        >
          <MenuIcon />
        </IconButton> */}

        {/* Logo or Title */}
        <Typography
          variant="h6"
          component="div"
          sx={{ flexGrow: 1 }}
          onClick={() => navigate("/")}
          style={{ cursor: "pointer" }}
        >
          CookBooks
        </Typography>

        {/* Conditional Login/Logout */}
        {localStorage.getItem("token") ? (
          <Button color="inherit" onClick={handleLogout}>
            Logout
          </Button>
        ) : (
          <Button color="inherit" onClick={() => navigate("/login")}>
            Login
          </Button>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
