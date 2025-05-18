import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
  Button,
  Container,
  TextField,
  List,
  ListItem,
  ListItemText,
  Box,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Typography
} from '@mui/material';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const [jobs, setJobs] = useState([]);
  const [title, setTitle] = useState('');
  const [openDialog, setOpenDialog] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editJobId, setEditJobId] = useState(null);
  const token = localStorage.getItem('token');
  const navigate = useNavigate();

  const fetchJobs = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/jobs', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setJobs(res.data);
    } catch (error) {
      if (error.response && error.response.status === 401) {
        navigate('/not-authorized');
      } else {
        console.error('Error fetching jobs:', error);
      }
    }
  };

  const handleOpenDialog = (job = null) => {
    if (job) {
      setIsEditing(true);
      setTitle(job.title);
      setEditJobId(job.id);
    } else {
      setIsEditing(false);
      setTitle('');
      setEditJobId(null);
    }
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setTitle('');
    setIsEditing(false);
    setEditJobId(null);
  };

  const handleSaveJob = async () => {
    try {
      if (isEditing) {
        await axios.put(
          `http://localhost:5000/api/jobs/${editJobId}`,
          { title },
          { headers: { Authorization: `Bearer ${token}` } }
        );
      } else {
        await axios.post(
          'http://localhost:5000/api/jobs',
          { title },
          { headers: { Authorization: `Bearer ${token}` } }
        );
      }
       handleCloseDialog();
      fetchJobs();
    } catch (error) {
            console.error('Add edit Failed:',error)
    }
   
  };

  const deleteJob = async (id) => {
    try{
      await axios.delete(`http://localhost:5000/api/jobs/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      fetchJobs();
    } catch (error) {
      console.error('Delete Failed:',error)
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  useEffect(() => {
    if (!token) {
      navigate('/not-authorized');
    } else {
      fetchJobs();
    }
  }, []);

  return (
    <Container>

      <Box display="flex" justifyContent="space-between" alignItems="center" mt={3} mb={4}>
        <Typography variant="h4" fontWeight="bold">Job Portal</Typography>
        <Button onClick={handleLogout} variant="outlined" color="error">
          Logout
        </Button>
      </Box>

      <Box display="flex" justifyContent="space-between" alignItems="center" mt={2} mb={2}>
        <h2>Job Listings</h2>
        <Button onClick={() => handleOpenDialog()} variant="contained">Create Job</Button>
      </Box>

      <List
       sx={{
    border: '1px solid #ccc',
    borderRadius: 2,
    padding: 2
  }}>
        {jobs.map(job => (
          <ListItem
            key={job.id}
            secondaryAction={
              <Box display="flex" gap={1}>
                <Button onClick={() => handleOpenDialog(job)} variant="outlined" size="small">
                  Edit
                </Button>
                <Button onClick={() => deleteJob(job.id)} color="error" variant="outlined" size="small">
                  Delete
                </Button>
              </Box>
            }
          >
            <ListItemText primary={job.title} />
          </ListItem>
        ))}
      </List>

      {/* Add/Edit Dialog */}
      <Dialog open={openDialog} onClose={handleCloseDialog} fullWidth maxWidth="sm">
        <DialogTitle>{isEditing ? 'Edit Job' : 'Create Job'}</DialogTitle>
        <DialogContent>
          <TextField
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            label="Job Title"
            fullWidth
            margin="normal"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} color="error" variant="outlined">
            Cancel
          </Button>
          <Button onClick={handleSaveJob} variant="contained">
            {isEditing ? 'Update' : 'Create'}
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default Home;
