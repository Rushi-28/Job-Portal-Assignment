import React, { useState } from 'react';
import axios from 'axios';
import { TextField, Button, Container, Box, Typography } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';

const Login = () => {
  const [form, setForm] = useState({ email: '', password: '' });
  const navigate = useNavigate();

  const handleSubmit = async () => {
    try {
      const res = await axios.post('http://localhost:5000/api/auth/login', form);
      localStorage.setItem('token', res.data.token);
      navigate('/');
    } catch (error) {
      console.error('Login Failed:',error)
    }
  };

  return (
    <Container maxWidth="sm">
      <Box m={2} textAlign="center">
        <h1 >Job Portal</h1>
      </Box>

      <h2>Login</h2>
      <TextField label="Email" fullWidth margin="normal" onChange={e => setForm({ ...form, email: e.target.value })} />
      <TextField label="Password" type="password" fullWidth margin="normal" onChange={e => setForm({ ...form, password: e.target.value })} />
      <Button onClick={handleSubmit} variant="contained">Login</Button>
      <Box mt={2} textAlign="center">
        <Typography variant="body2">
          New user? <Link to="/register">Register here</Link>
        </Typography>
      </Box>
    </Container>
  );
};

export default Login;