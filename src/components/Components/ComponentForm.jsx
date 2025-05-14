// import { useState, useEffect } from 'react';
// import { Dialog, DialogTitle, DialogContent, DialogActions, TextField, Button, MenuItem } from '@mui/material';
// import { useComponents } from '../../contexts/ComponentsContext';
// import { getData } from '../../utils/localStorageUtils';

// const ComponentForm = ({ open, onClose, component, shipId }) => {
//   const { addComponent, updateComponent } = useComponents();
//   const ships = getData('ships');
//   const [formData, setFormData] = useState({
//     name: '',
//     serialNumber: '',
//     installDate: '',
//     lastMaintenanceDate: '',
//     shipId: shipId || ''
//   });

//   useEffect(() => {
//     if (component) {
//       setFormData(component);
//     } else {
//       setFormData({
//         name: '',
//         serialNumber: '',
//         installDate: '',
//         lastMaintenanceDate: '',
//         shipId: shipId || ''
//       });
//     }
//   }, [component, shipId]);

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData(prev => ({ ...prev, [name]: value }));
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     if (component) {
//       updateComponent(component.id, formData);
//     } else {
//       addComponent(formData);
//     }
//     onClose();
//   };

//   return (
//     <Dialog open={open} onClose={onClose}>
//       <DialogTitle>
//         {'Add New Component'}</DialogTitle>
//       <DialogContent>
//         <form onSubmit={handleSubmit}>
//           {!shipId && (
//             <TextField
//               margin="normal"
//               fullWidth
//               select
//               label="Ship"
//               name="shipId"
//               value={formData.shipId}
//               onChange={handleChange}
//               required
//             >
//               {ships.map(ship => (
//                 <MenuItem key={ship.id} value={ship.id}>{ship.name}</MenuItem>
//               ))}
//             </TextField>
//           )}
//           <TextField
//             margin="normal"
//             fullWidth
//             label="Name"
//             name="name"
//             value={formData.name}
//             onChange={handleChange}
//             required
//           />
//           <TextField
//             margin="normal"
//             fullWidth
//             label="Serial Number"
//             name="serialNumber"
//             value={formData.serialNumber}
//             onChange={handleChange}
//             required
//           />
//           <TextField
//             margin="normal"
//             fullWidth
//             label="Installation Date"
//             name="installDate"
//             type="date"
//             InputLabelProps={{ shrink: true }}
//             value={formData.installDate}
//             onChange={handleChange}
//             required
//           />
//           <TextField
//             margin="normal"
//             fullWidth
//             label="Last Maintenance Date"
//             name="lastMaintenanceDate"
//             type="date"
//             InputLabelProps={{ shrink: true }}
//             value={formData.lastMaintenanceDate}
//             onChange={handleChange}
//             required
//           />
//         </form>
//       </DialogContent>
//       <DialogActions>
//         <Button onClick={onClose}>Cancel</Button>
//         <Button onClick={handleSubmit} color="primary" variant="contained">
//           {component ? 'Update' : 'Add'}
//         </Button>
//       </DialogActions>
//     </Dialog>
//   );
// };

// export default ComponentForm;


import { useState, useEffect } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  MenuItem,
  Box
} from '@mui/material';
import { useComponents } from '../../contexts/ComponentsContext';
import { getData } from '../../utils/localStorageUtils';

const ComponentForm = ({ open, onClose, component, shipId }) => {
  const { addComponent, updateComponent } = useComponents();
  const ships = getData('ships');
  const [formData, setFormData] = useState({
    name: '',
    serialNumber: '',
    installDate: '',
    lastMaintenanceDate: '',
    shipId: shipId || ''
  });

  useEffect(() => {
    if (component) {
      setFormData(component);
    } else {
      setFormData({
        name: '',
        serialNumber: '',
        installDate: '',
        lastMaintenanceDate: '',
        shipId: shipId || ''
      });
    }
  }, [component, shipId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (component) {
      updateComponent(component.id, formData);
      onClose(false); // Editing - no snackbar
    } else {
      addComponent(formData);
      onClose(true); // New component added - show snackbar
    }
  };

  return (
    <Dialog open={open} onClose={() => onClose(false)} fullWidth maxWidth="sm">
      <DialogTitle
        sx={{
          fontWeight: 'bold',
          textAlign: 'center',
          py: 2
        }}
      >
        {'Add New Component'}
      </DialogTitle>

      <DialogContent sx={{ py: 3 }}>
        <Box component="form" onSubmit={handleSubmit}>
          {!shipId && (
            <TextField
              margin="dense"
              fullWidth
              select
              label="Ship"
              name="shipId"
              value={formData.shipId}
              onChange={handleChange}
              required
            >
              {ships.map(ship => (
                <MenuItem key={ship.id} value={ship.id}>
                  {ship.name}
                </MenuItem>
              ))}
            </TextField>
          )}
          <TextField
            margin="dense"
            fullWidth
            label="Name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
          <TextField
            margin="dense"
            fullWidth
            label="Serial Number"
            name="serialNumber"
            value={formData.serialNumber}
            onChange={handleChange}
            required
          />
          <TextField
            margin="dense"
            fullWidth
            label="Installation Date"
            name="installDate"
            type="date"
            InputLabelProps={{ shrink: true }}
            value={formData.installDate}
            onChange={handleChange}
            required
          />
          <TextField
            margin="dense"
            fullWidth
            label="Last Maintenance Date"
            name="lastMaintenanceDate"
            type="date"
            InputLabelProps={{ shrink: true }}
            value={formData.lastMaintenanceDate}
            onChange={handleChange}
            required
          />
        </Box>
      </DialogContent>

      <DialogActions sx={{ px: 3, pb: 3 }}>
        <Button
          onClick={() => onClose(false)}
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
          }}
        >
          Cancel
        </Button>
        <Button
          onClick={handleSubmit}
          variant="contained"
          sx={{
            backgroundColor: '#1a237e',
            color: '#fff',
            textTransform: 'none',
            fontWeight: 500,
            '&:hover': {
              backgroundColor: '#151c6a'
            }
          }}
        >
          {component ? 'Update' : 'Add'}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ComponentForm;
