import { useState, useEffect } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, TextField, Button, MenuItem, Snackbar, Alert } from '@mui/material';
import { useJobs } from '../../contexts/JobsContext';
import { getData } from '../../utils/localStorageUtils';

const JobForm = ({ open, onClose, job }) => {
  const { addJob, updateJob } = useJobs();
  const ships = getData('ships');
  const components = getData('components');
  const engineers = getData('users').filter(user => user.role === 'Engineer');
  
  const [formData, setFormData] = useState({
    type: '',
    componentId: '',
    shipId: '',
    priority: 'Medium',
    status: 'Open',
    assignedEngineerId: '',
    scheduledDate: ''
  });

  const [openSnackbar, setOpenSnackbar] = useState(false); // Snackbar state
  const [snackbarMessage, setSnackbarMessage] = useState('');

  useEffect(() => {
    if (job) {
      setFormData(job);
    } else {
      setFormData({
        type: '',
        componentId: '',
        shipId: '',
        priority: 'Medium',
        status: 'Open',
        assignedEngineerId: '',
        scheduledDate: ''
      });
    }
  }, [job]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (job) {
      updateJob(job.id, formData);
      setSnackbarMessage('Job updated successfully!');
    } else {
      addJob(formData);
      setSnackbarMessage('Job added successfully!');
    }
    setOpenSnackbar(true);
    onClose();
  };

  const filteredComponents = formData.shipId 
    ? components.filter(comp => comp.shipId === formData.shipId)
    : [];

  return (
    <>
      <Dialog open={open} onClose={onClose}>
        <DialogTitle sx={{
            fontWeight: 'bold',
            textAlign: 'center',
            py: 2
          }}>{'Add New Job'}</DialogTitle>
        <DialogContent>
          <form onSubmit={handleSubmit}>
            <TextField
              margin="normal"
              fullWidth
              select
              label="Ship"
              name="shipId"
              value={formData.shipId}
              onChange={handleChange}
              required
            >
              {ships.map(ship => (
                <MenuItem key={ship.id} value={ship.id}>{ship.name}</MenuItem>
              ))}
            </TextField>

            <TextField
              margin="normal"
              fullWidth
              select
              label="Component"
              name="componentId"
              value={formData.componentId}
              onChange={handleChange}
              required
              disabled={!formData.shipId}
            >
              {filteredComponents.map(comp => (
                <MenuItem key={comp.id} value={comp.id}>{comp.name}</MenuItem>
              ))}
            </TextField>

            <TextField
              margin="normal"
              fullWidth
              label="Job Type"
              name="type"
              value={formData.type}
              onChange={handleChange}
              required
            />

            <TextField
              margin="normal"
              fullWidth
              select
              label="Priority"
              name="priority"
              value={formData.priority}
              onChange={handleChange}
              required
            >
              <MenuItem value="Low">Low</MenuItem>
              <MenuItem value="Medium">Medium</MenuItem>
              <MenuItem value="High">High</MenuItem>
            </TextField>

            <TextField
              margin="normal"
              fullWidth
              select
              label="Status"
              name="status"
              value={formData.status}
              onChange={handleChange}
              required
            >
              <MenuItem value="Open">Open</MenuItem>
              <MenuItem value="In Progress">In Progress</MenuItem>
              <MenuItem value="Completed">Completed</MenuItem>
            </TextField>

            <TextField
              margin="normal"
              fullWidth
              select
              label="Assigned Engineer"
              name="assignedEngineerId"
              value={formData.assignedEngineerId}
              onChange={handleChange}
            >
              {engineers.map(eng => (
                <MenuItem key={eng.id} value={eng.id}>{eng.email}</MenuItem>
              ))}
            </TextField>

            <TextField
              margin="normal"
              fullWidth
              label="Scheduled Date"
              name="scheduledDate"
              type="date"
              InputLabelProps={{ shrink: true }}
              value={formData.scheduledDate}
              onChange={handleChange}
              required
            />
          </form>
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose} 
            variant="outlined"
            sx={{
              color: '#1a237e',
              borderColor: '#1a237e',
              textTransform: 'none',
              fontWeight: 500,
              '&:hover': {
                backgroundColor: '#f3f4fd',
                borderColor: '#1a237e'
              }
            }}>Cancel</Button>
          <Button onClick={handleSubmit} variant="contained"
            sx={{
              backgroundColor: '#1a237e',
              color: '#fff',
              textTransform: 'none',
              fontWeight: 500,
              '&:hover': {
                backgroundColor: '#151c6a'
              }
            }}>
            {'Add'}
          </Button>
        </DialogActions>
      </Dialog>

      {/* Snackbar for success message */}
      <Snackbar
        open={openSnackbar}
        autoHideDuration={3000}
        onClose={() => setOpenSnackbar(false)}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert onClose={() => setOpenSnackbar(false)} severity="success" sx={{ width: '100%' }}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </>
  );
};

export default JobForm;
