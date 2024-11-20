import React, { useState } from "react";
import { TextField, Button, Container, Typography, Box, Paper } from "@mui/material";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Signup = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState({
    firstName: "",
    lastName: "",
    email: "",
    mobile: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (user.password !== user.confirmPassword) {
      alert("Passwords do not match");
      return;
    }
    const payload = {
      firstname: user.firstName,
      lastname: user.lastName,
      email: user.email,
      mobileNumber: user.mobile,
      password: user.password,
    };

    try {
      await axios.post("http://localhost:8080/api/auth/signup", payload);
      alert("Signup successful!");
      navigate("/login");
    } catch (err) {
      alert("Signup failed: " + (err.response?.data || "Server error"));
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
        background: "linear-gradient(135deg, #e1f5fe, #fce4ec)", // Gradient background
        padding: 2,
      }}
    >
      <Paper
        elevation={10}
        sx={{
          padding: 4,
          maxWidth: 450,
          borderRadius: 3,
          boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.2)",
        }}
      >
        <Typography
          variant="h4"
          gutterBottom
          sx={{ fontWeight: "bold", color: "#1565c0", textAlign: "center" }}
        >
          Signup
        </Typography>
        <Typography
          variant="subtitle1"
          color="textSecondary"
          gutterBottom
          sx={{ textAlign: "center", mb: 3 }}
        >
          Create your account
        </Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            fullWidth
            label="First Name"
            name="firstName"
            margin="normal"
            variant="outlined"
            value={user.firstName}
            onChange={handleChange}
            required
          />
          <TextField
            fullWidth
            label="Last Name"
            name="lastName"
            margin="normal"
            variant="outlined"
            value={user.lastName}
            onChange={handleChange}
            required
          />
          <TextField
            fullWidth
            type="email"
            label="Email"
            name="email"
            margin="normal"
            variant="outlined"
            value={user.email}
            onChange={handleChange}
            required
          />
          <TextField
            fullWidth
            label="Mobile Number"
            name="mobile"
            margin="normal"
            variant="outlined"
            value={user.mobile}
            onChange={handleChange}
            required
          />
          <TextField
            fullWidth
            type="password"
            label="Password"
            name="password"
            margin="normal"
            variant="outlined"
            value={user.password}
            onChange={handleChange}
            required
          />
          <TextField
            fullWidth
            type="password"
            label="Confirm Password"
            name="confirmPassword"
            margin="normal"
            variant="outlined"
            value={user.confirmPassword}
            onChange={handleChange}
            required
          />
          <Button
            type="submit"
            fullWidth
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
            Signup
          </Button>
        </form>
        <Typography align="center" sx={{ mt: 3 }}>
          Already have an account?{" "}
          <Button
            color="primary"
            onClick={() => navigate("/login")}
            sx={{ fontWeight: "bold", textTransform: "none" }}
          >
            Login
          </Button>
        </Typography>
      </Paper>
    </Box>
  );
};

export default Signup;
