import React from 'react';
import { useNavigate } from 'react-router-dom';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { Button } from '@mui/material';

function SignupSuccess() {
  const navigate = useNavigate(); // Replaced useHistory with useNavigate

  const handleRedirectToLogin = () => {
    navigate('/login'); // Redirect to login after successful signup
  };

  return (
    <div style={{ textAlign: 'center', marginTop: '50px' }}>
      <CheckCircleIcon style={{ fontSize: '100px', color: 'green' }} />
      <h1>Signup Successful!</h1>
      <Button variant="contained" color="primary" onClick={handleRedirectToLogin}>
        Go to Login
      </Button>
    </div>
  );
}

export default SignupSuccess;
