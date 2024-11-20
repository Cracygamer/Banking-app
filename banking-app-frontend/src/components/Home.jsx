import React from 'react';
import { Container, Box, Typography, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import backgroundImage from '../assets/bank2.jpg'; // Import the image

const Home = () => {
  const navigate = useNavigate();

  const handleLogin = () => {
    navigate('/login');
  };

  const handleSignup = () => {
    navigate('/signup');
  };

  return (
    <div
      style={{
        position: 'relative',
        width: '100%',
        height: '100vh',
        overflow: 'hidden',
      }}
    >
      {/* Background without Blur */}
      <div
        style={{
          backgroundImage: `url(${backgroundImage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          zIndex: -1,
        }}
      ></div>

      {/* Content Box with Reduced Transparency */}
      <Container
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          height: '100vh',
        }}
      >
        <Box
          p={5}
          boxShadow={5}
          borderRadius={2}
          bgcolor="rgba(255, 255, 255, 0.8)" // Reduced transparency
          textAlign="center"
        >
          <Typography variant="h4" gutterBottom>
            Welcome to Online Banking
          </Typography>
          <Typography variant="body1" gutterBottom>
            To continue, please log in or sign up.
          </Typography>
          <Box mt={3}>
            <Button
              variant="contained"
              color="primary"
              onClick={handleLogin}
              style={{ marginRight: 10 }}
            >
              Login
            </Button>
            <Button variant="outlined" color="primary" onClick={handleSignup}>
              Signup
            </Button>
          </Box>
        </Box>
      </Container>
    </div>
  );
};

export default Home;
