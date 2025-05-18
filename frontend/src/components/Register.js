import React, { useState } from 'react';
import axios from 'axios';
import { TextField, Button, Container, Box, Typography } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';

const Register = () => {
  const [form, setForm] = useState({ email: '', password: '' });
  const navigate = useNavigate();

  const handleSubmit = async () => {
    try {
      await axios.post('http://localhost:5000/api/auth/register', form);
      alert('Registered. Now login.');
      navigate('/login')
    } catch (error) {
      alert('Registeration Failed. Please try again later.');
      console.error('Register Failed:',error)
    }
    
  };

  return (
    <Container maxWidth="sm">
      <h2>Register</h2>
      <TextField label="Email" fullWidth margin="normal" onChange={e => setForm({ ...form, email: e.target.value })} />
      <TextField label="Password" type="password" fullWidth margin="normal" onChange={e => setForm({ ...form, password: e.target.value })} />
      <Button onClick={handleSubmit} variant="contained">Register</Button>
      <Box mt={2} textAlign="center">
        <Typography variant="body2">
          Existing user? <Link to="/login">Go to Login</Link>
        </Typography>
      </Box>
    </Container>
  );
};

export default Register;