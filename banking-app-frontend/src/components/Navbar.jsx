import React from 'react';
import { AppBar, Toolbar, Typography, Button } from '@mui/material';

const Navbar = () => {
  return (
    <AppBar position="static" style={{ backgroundColor: '#2E3B55' }}>
      <Toolbar>
        <Typography variant="h6" style={{ flexGrow: 1 }}>
          Banking App
        </Typography>
        <Button color="inherit" href="/login">Login</Button>
        <Button color="inherit" href="/signup">Signup</Button>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
