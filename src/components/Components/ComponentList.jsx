import { useState } from 'react';
import { useComponents } from '../../contexts/ComponentsContext';
import { useAuth } from '../../contexts/AuthContext';
import {
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
  Paper, Button, IconButton, Typography, Box, Snackbar, Alert
} from '@mui/material';
import { Edit, Delete, Add } from '@mui/icons-material';
import { Link } from 'react-router-dom';
import ComponentForm from './ComponentForm';

const ComponentList = ({ shipId }) => {
  const { components, loading, deleteComponent } = useComponents();
  const { user } = useAuth();
  const [openForm, setOpenForm] = useState(false);
  const [selectedComponent, setSelectedComponent] = useState(null);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');

  const filteredComponents = shipId
    ? components.filter(comp => comp.shipId === shipId)
    : components;

  const handleEdit = (component) => {
    setSelectedComponent(component);
    setOpenForm(true);
  };

  const handleFormClose = (wasSuccessful) => {
    setOpenForm(false);
    setSelectedComponent(null);
    if (wasSuccessful) {
      setSnackbarMessage('Component added successfully!');
      setSnackbarOpen(true);
    }
  };

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
    setSnackbarMessage('');
  };

  if (loading) return <Typography>Loading components...</Typography>;

  return (
    <Box>
      {!shipId && (
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
          <Typography variant="h4">All Components</Typography>
          {user?.role !== 'Inspector' && (
            <Button
              variant="contained"
              startIcon={<Add />}
              onClick={() => {
                setSelectedComponent(null);
                setOpenForm(true);
              }}
              sx={{
                backgroundColor: '#1a237e',
                color: '#fff',
                '&:hover': {
                  backgroundColor: '#151c6a',
                },
                textTransform: 'none',
                fontWeight: 500,
              }}
            >
              Add Component
            </Button>
          )}
        </Box>
      )}

      <ComponentForm
        open={openForm}
        onClose={handleFormClose}
        component={selectedComponent}
        shipId={shipId}
      />

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              {!shipId && <TableCell><b>Ship</b></TableCell>}
              <TableCell><b>Name</b></TableCell>
              <TableCell><b>Serial Number</b></TableCell>
              <TableCell><b>Install Date</b></TableCell>
              <TableCell><b>Last Maintenance</b></TableCell>
              <TableCell><b>Actions</b></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredComponents.map((component) => (
              <TableRow key={component.id}>
                {!shipId && (
                  <TableCell>
                    <Link to={`/ships/${component.shipId}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                      {component.shipId}
                    </Link>
                  </TableCell>
                )}
                <TableCell>{component.name}</TableCell>
                <TableCell>{component.serialNumber}</TableCell>
                <TableCell>{component.installDate}</TableCell>
                <TableCell>{component.lastMaintenanceDate}</TableCell>
                <TableCell>
                  <IconButton onClick={() => handleEdit(component)}>
                    <Edit color="primary" />
                  </IconButton>
                  {user?.role === 'Admin' && (
                    <IconButton onClick={() => deleteComponent(component.id)}>
                      <Delete color="error" />
                    </IconButton>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Snackbar
        open={snackbarOpen}
        autoHideDuration={3000}
        onClose={handleSnackbarClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert onClose={handleSnackbarClose} severity="success" sx={{ width: '100%' }}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default ComponentList;
