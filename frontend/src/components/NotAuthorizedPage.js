import React from 'react';
import { Box, Typography, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const NotAuthorizedPage = () => {
  const navigate = useNavigate();

  const handleGoBack = () => {
    navigate('/login');
  };

  return (
    <Box
      height="100vh"
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
      textAlign="center"
      bgcolor="#f8f8f8"
      px={2}
    >
      <Typography variant="h3" color="error" gutterBottom>
        403 - Not Authorized
      </Typography>
      <Typography variant="body1" mb={3}>
        You do not have permission to view this page.
      </Typography>
      <Button variant="contained" color="primary" onClick={handleGoBack}>
        Go to Login
      </Button>
    </Box>
  );
};

export default NotAuthorizedPage;
