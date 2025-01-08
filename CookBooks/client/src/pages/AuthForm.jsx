import { useState } from "react";
import { useLoginMutation, useRegisterMutation } from "../features/auth/authSlice";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Button,
  TextField,
  Typography,
  CircularProgress,
  Alert,
  Card,
} from "@mui/material";

function AuthForm() {
  const [login] = useLoginMutation();
  const [register] = useRegisterMutation();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [isLogin, setIsLogin] = useState(true);
  const authType = isLogin ? "Login" : "Register";
  const oppositeAuthCopy = isLogin
    ? "Don't have an account?"
    : "Already have an account?";
  const oppositeAuthType = isLogin ? "Register" : "Login";

  async function attemptAuth(event) {
    event.preventDefault();
    setError(null);

    if (!username || !password) {
      setError("Username and password are required.");
      return;
    }

    const authMethod = isLogin ? login : register;
    const credentials = { username, password };

    try {
      setLoading(true);
      const result = await authMethod(credentials).unwrap();
      console.log("Login successful, redirecting to dashboard...", result);

      if (result.token) {
        localStorage.setItem("token", result.token);
      }

      navigate("/");
    } catch (err) {
      setLoading(false);

      if (err.status === 401) {
        setError("Invalid login credentials.");
      } else if (err.status === 500) {
        setError("Server error. Please try again later.");
      } else {
        setError(err?.data?.message || "An unexpected error occurred.");
      }
    } finally {
      setLoading(false);
    }
  }

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "calc(100vh - 64px)",
        backgroundColor: "#f5f5f5",
      }}
    >
      <Card
        sx={{
          padding: 4,
          width: {
            xs: "90%", // 90% width on extra small screens
            sm: "400px", // Fixed width on small and larger screens
          },
          boxShadow: 3,
          backgroundColor: "#fff",
        }}
      >
        <Typography variant="h4" textAlign="center" gutterBottom>
          {authType}
        </Typography>

        <form onSubmit={attemptAuth} name={authType}>
          {/* Username Field */}
          <TextField
            label="Username"
            variant="outlined"
            fullWidth
            margin="normal"
            value={username}
            onChange={(event) => setUsername(event.target.value)}
            required
          />

          {/* Password Field */}
          <TextField
            label="Password"
            type="password"
            variant="outlined"
            fullWidth
            margin="normal"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            required
          />

          {/* Error Message */}
          {error && (
            <Alert severity="error" sx={{ marginTop: 2 }}>
              {error}
            </Alert>
          )}

          {/* Submit Button */}
          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            disabled={loading}
            sx={{ marginTop: 2 }}
          >
            {loading ? <CircularProgress size={24} /> : authType}
          </Button>
        </form>

        {/* Toggle Between Login/Register */}
        <Box textAlign="center" sx={{ marginTop: 2 }}>
          <Typography variant="body2">
            {oppositeAuthCopy}{" "}
            <Button
              variant="text"
              onClick={() => setIsLogin(!isLogin)}
              sx={{ textTransform: "none" }}
            >
              {oppositeAuthType}
            </Button>
          </Typography>
        </Box>
      </Card>
    </Box>
  );
}

export default AuthForm;
