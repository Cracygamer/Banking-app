import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import { Box, Button, TextField, Typography, Container, Paper, Grid } from "@mui/material";

const Login = ({ onLogin }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(""); // Clear any previous errors

    try {
      const response = await axios.post("http://localhost:8080/api/auth/login", { email, password });
      if (response.data === "Login successful!") {
        onLogin(email);
        navigate("/dashboard");
      } else {
        throw new Error("Unexpected response format from server.");
      }
    } catch (err) {
      setError(err.response?.data || "Invalid email or password!");
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
        background: "linear-gradient(135deg, #f3e5f5, #e1f5fe)", // Gradient background
        padding: 2,
      }}
    >
      <Paper
        elevation={10}
        sx={{
          padding: 4,
          maxWidth: 400,
          borderRadius: 3,
          boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.2)",
        }}
      >
        <Typography
          variant="h4"
          gutterBottom
          sx={{ fontWeight: "bold", color: "#1565c0", textAlign: "center" }}
        >
          Welcome to Aura Bank
        </Typography>
        <Typography
          variant="subtitle1"
          color="textSecondary"
          gutterBottom
          sx={{ textAlign: "center", mb: 3 }}
        >
          Secure Login
        </Typography>
        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }} noValidate autoComplete="off">
          <TextField
            fullWidth
            type="email"
            label="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            variant="outlined"
            margin="normal"
            required
          />
          <TextField
            fullWidth
            type="password"
            label="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            variant="outlined"
            margin="normal"
            required
          />
          {error && (
            <Typography color="error" variant="body2" sx={{ mt: 1 }}>
              {error}
            </Typography>
          )}
          <Button
            fullWidth
            type="submit"
            variant="contained"
            sx={{
              mt: 3,
              py: 1.5,
              background: "linear-gradient(45deg, #1e88e5, #42a5f5)",
              color: "white",
              fontWeight: "bold",
              '&:hover': { background: "linear-gradient(45deg, #1976d2, #2196f3)" },
            }}
          >
            Login
          </Button>
        </Box>
        <Grid container justifyContent="flex-end" sx={{ mt: 2 }}>
          <Grid item>
            <Typography variant="body2">
              Don’t have an account?{" "}
              <Link to="/signup" style={{ textDecoration: "none", color: "#1976d2", fontWeight: "bold" }}>
                Sign up
              </Link>
            </Typography>
          </Grid>
        </Grid>
      </Paper>
    </Box>
  );
};

export default Login;
