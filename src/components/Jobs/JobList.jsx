import { useState } from 'react';
import { useJobs } from '../../contexts/JobsContext';
import { useAuth } from '../../contexts/AuthContext';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button, IconButton, Typography, Box } from '@mui/material';
import { Edit, Delete, Add } from '@mui/icons-material';
import { Link } from 'react-router-dom';
import JobForm from './JobForm';

const JobList = () => {
  const { jobs, loading, deleteJob } = useJobs();
  const { user } = useAuth();
  const [openForm, setOpenForm] = useState(false);

  if (loading) return <Typography>Loading jobs...</Typography>;

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
        <Typography variant="h4">Maintenance Jobs</Typography>
        <Button variant="contained" startIcon={<Add />} sx={{
            backgroundColor: '#1a237e',
            color: '#fff',
            '&:hover': {
              backgroundColor: '#151c6a',
            },
            textTransform: 'none',
            fontWeight: 500,
          }} onClick={() => setOpenForm(true)}>
          Add Job
        </Button>
      </Box>

      <JobForm open={openForm} onClose={() => setOpenForm(false)} />

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell><b>Job Type</b></TableCell>
              <TableCell><b>Component</b></TableCell>
              <TableCell><b>Ship</b></TableCell>
              <TableCell><b>Priority</b></TableCell>
              <TableCell><b>Status</b></TableCell>
              <TableCell><b>Actions</b></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {jobs.map((job) => (
              <TableRow key={job.id}>
                <TableCell>{job.type}</TableCell>
                <TableCell>{job.componentId}</TableCell>
                <TableCell>{job.shipId}</TableCell>
                <TableCell>{job.priority}</TableCell>
                <TableCell>{job.status}</TableCell>
                <TableCell>
                  <IconButton component={Link} to={`/jobs/${job.id}`}>
                    <Edit color="primary" />
                  </IconButton>
                  {user?.role === 'Admin' && (
                    <IconButton onClick={() => deleteJob(job.id)}>
                      <Delete color="error" />
                    </IconButton>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default JobList;
